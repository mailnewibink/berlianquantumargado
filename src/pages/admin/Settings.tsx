import React, { useState, useEffect } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Save, Database, Building2, Phone, Lock, ShieldCheck, CheckCircle } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    companyName: 'PT Berlian Quantum Argado',
    tagline: 'Healthcare Infrastructure & Radiation Shielding Specialist',
    phone: '+62 812-3456-7890',
    whatsapp: '6281234567890',
    email: 'info@berlianquantum.co.id',
    address: 'Jakarta, Indonesia',
    workingHours: 'Mon - Fri: 08:00 - 17:00 WIB',
    defaultLanguage: 'id',
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bqa_admin_settings');
    if (saved) {
      try { setSettings(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      localStorage.setItem('bqa_admin_settings', JSON.stringify(settings));
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 400);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: 'Manrope', color: '#0F172A' }}>Portal Settings</h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>Configure website details, contact information, and system parameters.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: '#0EA5E9', 
            color: '#FFFFFF', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '8px', 
            border: 'none', 
            cursor: saving ? 'not-allowed' : 'pointer', 
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(14, 165, 233, 0.2)'
          }}
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
          <CheckCircle size={20} /> Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* DATABASE STATUS */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
            <Database size={20} color="#0EA5E9" /> Supabase Connection Status
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: isSupabaseConfigured() ? '#F0FDF4' : '#FFFBEB', borderRadius: '8px', border: `1px solid ${isSupabaseConfigured() ? '#BBF7D0' : '#FDE68A'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={24} color={isSupabaseConfigured() ? '#16A34A' : '#D97706'} />
              <div>
                <h4 style={{ margin: '0 0 0.15rem 0', color: isSupabaseConfigured() ? '#15803D' : '#92400E', fontSize: '0.95rem' }}>
                  {isSupabaseConfigured() ? 'Supabase Connected' : 'Running in Offline / Local Demo Mode'}
                </h4>
                <p style={{ margin: 0, color: isSupabaseConfigured() ? '#166534' : '#B45309', fontSize: '0.85rem' }}>
                  {isSupabaseConfigured() ? 'Live database connection active with auto-fallback protection enabled.' : 'Add VITE_SUPABASE_URL to .env to connect to live Supabase cloud.'}
                </p>
              </div>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '4px', backgroundColor: isSupabaseConfigured() ? '#DCFCE7' : '#FEF3C7', color: isSupabaseConfigured() ? '#15803D' : '#92400E' }}>
              {isSupabaseConfigured() ? 'ONLINE' : 'OFFLINE MODE'}
            </span>
          </div>
        </section>

        {/* COMPANY PROFILE */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
            <Building2 size={20} color="#0EA5E9" /> Company Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Company Name</label>
              <input 
                type="text" 
                value={settings.companyName}
                onChange={e => setSettings({ ...settings, companyName: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Tagline / Slogan</label>
              <input 
                type="text" 
                value={settings.tagline}
                onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </section>

        {/* CONTACT & LOCATION */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
            <Phone size={20} color="#0EA5E9" /> Contact Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Primary Phone</label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={e => setSettings({ ...settings, phone: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>WhatsApp Number (Country Code)</label>
              <input 
                type="text" 
                value={settings.whatsapp}
                onChange={e => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="6281234567890"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Official Email</label>
              <input 
                type="email" 
                value={settings.email}
                onChange={e => setSettings({ ...settings, email: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Working Hours</label>
              <input 
                type="text" 
                value={settings.workingHours}
                onChange={e => setSettings({ ...settings, workingHours: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </section>

        {/* SECURITY & ADMIN CREDENTIALS */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
            <Lock size={20} color="#0EA5E9" /> Security & Access
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem' }}>
              Standard Demo Account: <strong>admin@berlianquantum.co.id</strong> / <strong>admin123</strong>.
            </p>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem' }}>
              To update production authentication credentials, navigate to your Supabase Auth Console under <em>Authentication -&gt; Users</em>.
            </p>
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit"
            disabled={saving}
            style={{ 
              backgroundColor: '#0EA5E9', 
              color: '#FFFFFF', 
              fontWeight: 600, 
              padding: '0.85rem 2rem', 
              borderRadius: '8px', 
              border: 'none', 
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 4px rgba(14, 165, 233, 0.2)'
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
