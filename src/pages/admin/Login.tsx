import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Lock, Mail } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in (either via dummy session or Supabase session)
    if (localStorage.getItem('dummy_session') === 'true') {
      navigate('/admin');
      return;
    }
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate('/admin');
        }
      });
    }
  }, [navigate]);

  const handleDemoLogin = () => {
    localStorage.setItem('dummy_session', 'true');
    navigate('/admin');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. If using standard demo credentials, log in immediately via Demo Mode
    if (email === 'admin@berlianquantum.co.id' && password === 'admin123') {
      handleDemoLogin();
      return;
    }

    // 2. Otherwise attempt Supabase Auth if configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        if (data.session) {
          localStorage.removeItem('dummy_session');
          navigate('/admin');
        }
      } catch (err: any) {
        setError(err.message || 'Gagal autentikasi Supabase. Periksa kembali email & password, atau gunakan Demo Mode.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Supabase tidak terkonfigurasi. Gunakan email: admin@berlianquantum.co.id / password: admin123');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
      <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '440px', border: '1px solid #E2E8F0' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#0EA5E9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 800, fontFamily: 'Manrope', fontSize: '1.25rem' }}>B</span>
          </div>
          <h1 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.75rem', color: '#0F172A', margin: '0 0 0.5rem 0' }}>Admin Portal</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Sign in to manage Berlian Quantum content</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>{error}</div>
            <button 
              type="button" 
              onClick={handleDemoLogin}
              style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
            >
              Masuk dengan Demo Mode →
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.95rem' }}
                placeholder="admin@berlianquantum.co.id"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.95rem' }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: '#0EA5E9', 
              color: '#FFFFFF', 
              fontWeight: 600, 
              padding: '0.85rem', 
              borderRadius: '8px', 
              border: 'none', 
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleDemoLogin}
            style={{
              backgroundColor: '#F1F5F9',
              color: '#475569',
              border: '1px solid #CBD5E1',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s'
            }}
          >
            ⚡ Direct Demo Login (Bypass Supabase)
          </button>
        </div>

      </div>
    </div>
  );
};
