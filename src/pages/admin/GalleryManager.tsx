import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Plus, Trash2 } from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    try {
      const { data, error } = await supabase.from('gallery_items').select('*, asset:assets(*)').order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: 'Manrope' }}>Gallery</h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>Manage public gallery images.</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0EA5E9', color: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          <Plus size={18} /> Add to Gallery
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>Loading...</div>
      ) : items.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>No gallery items found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {items.map(item => (
            <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 10 }}>
                <button style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#EF4444' }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div style={{ height: '180px', backgroundColor: '#F1F5F9' }}>
                {item.asset && (
                  <img src={item.asset.public_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div style={{ padding: '1rem' }}>
                <p style={{ fontWeight: 600, margin: '0 0 0.25rem 0' }}>{item.title || item.asset?.title}</p>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 0.5rem 0' }}>{item.category}</p>
                <span style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, backgroundColor: item.status === 'Published' ? '#DCFCE7' : '#FEF3C7', color: item.status === 'Published' ? '#166534' : '#92400E' }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
