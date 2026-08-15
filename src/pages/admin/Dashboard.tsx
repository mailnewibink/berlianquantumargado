import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Users, Package, Briefcase, Activity, Clock, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    projects: 0,
    products: 0,
    services: 0,
    rentals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, productsRes, servicesRes, rentalsRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('rentals').select('id', { count: 'exact' })
      ]);

      setStats({
        projects: projectsRes.count || 0,
        products: productsRes.count || 0,
        services: servicesRes.count || 0,
        rentals: rentalsRes.count || 0
      });
    } catch (e) {
      console.error("Error fetching stats", e);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: <Briefcase size={24} color="#0EA5E9" />, bg: '#E0F2FE', link: '/admin/projects' },
    { title: 'Total Products', value: stats.products, icon: <Package size={24} color="#10B981" />, bg: '#D1FAE5', link: '/admin/products' },
    { title: 'Total Services', value: stats.services, icon: <Activity size={24} color="#8B5CF6" />, bg: '#EDE9FE', link: '/admin/services' },
    { title: 'Equipment Rentals', value: stats.rentals, icon: <LayoutDashboard size={24} color="#F59E0B" />, bg: '#FEF3C7', link: '/admin/rentals' },
  ];

  return (
    <div style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: 'Manrope', color: '#0F172A' }}>Dashboard Overview</h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.95rem' }}>Welcome back to the Berlian Quantum Admin Portal.</p>
        </div>
      </div>

      {!isSupabaseConfigured() && (
        <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ color: '#D97706' }}>
            <Activity size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', color: '#92400E', fontSize: '0.95rem' }}>Supabase is not connected</h4>
            <p style={{ margin: 0, color: '#B45309', fontSize: '0.85rem' }}>You are currently running the admin portal without a database connection. Add your Supabase credentials to `.env` to enable full CRUD operations.</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {statCards.map((card, idx) => (
          <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ margin: '0 0 0.5rem 0', color: '#64748B', fontSize: '0.9rem', fontWeight: 600 }}>{card.title}</p>
                <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Manrope' }}>
                  {loading ? '...' : card.value}
                </h3>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.icon}
              </div>
            </div>
            <Link to={card.link} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0EA5E9', textDecoration: 'none', fontWeight: 600 }}>
              Manage <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Recent Activity */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="#64748B" /> Recent Activity
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: i !== 2 ? '1px solid #F1F5F9' : 'none' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={16} color="#64748B" />
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: '#334155' }}>
                    <span style={{ fontWeight: 600 }}>Admin User</span> updated the product <span style={{ fontWeight: 600 }}>"Lead Apron Premium"</span>
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{i + 1} hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A' }}>
            Quick Actions
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
            <Link to="/admin/projects" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', textDecoration: 'none', color: '#334155', border: '1px solid #E2E8F0', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                <Briefcase size={18} color="#0EA5E9" /> Add New Project
              </div>
              <ArrowRight size={16} color="#94A3B8" />
            </Link>
            <Link to="/admin/products" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', textDecoration: 'none', color: '#334155', border: '1px solid #E2E8F0', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                <Package size={18} color="#10B981" /> Add New Product
              </div>
              <ArrowRight size={16} color="#94A3B8" />
            </Link>
            <Link to="/admin/gallery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', textDecoration: 'none', color: '#334155', border: '1px solid #E2E8F0', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                <Activity size={18} color="#8B5CF6" /> Manage Gallery
              </div>
              <ArrowRight size={16} color="#94A3B8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
