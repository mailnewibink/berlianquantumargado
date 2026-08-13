import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Image as ImageIcon, LayoutDashboard, Briefcase, Box, LayoutGrid, Settings } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AdminLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isSupabaseConfigured()) {
        if (!localStorage.getItem('dummy_session')) {
          navigate('/admin/login');
        }
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    if (!isSupabaseConfigured()) {
      localStorage.removeItem('dummy_session');
      navigate('/admin/login');
      return;
    }
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Assets', path: '/admin/assets', icon: <ImageIcon size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Box size={20} /> },
    { name: 'Rentals', path: '/admin/rentals', icon: <LayoutGrid size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <Briefcase size={20} /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F8FAFC' }}>
        <p style={{ fontFamily: 'Manrope', fontWeight: 600 }}>Loading admin...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#FFFFFF', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #E2E8F0' }}>
          <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.25rem', color: '#020617', margin: 0 }}>
            BQA <span style={{ color: '#0EA5E9' }}>Admin</span>
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.25rem', margin: 0 }}>Content Management System</p>
        </div>

        <nav style={{ padding: '1.5rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? '#0EA5E9' : '#475569',
                  backgroundColor: isActive ? '#F0F9FF' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s',
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#EF4444',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'Inter',
            }}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header style={{ height: '70px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>
            {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
          </h2>
        </header>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

    </div>
  );
};
