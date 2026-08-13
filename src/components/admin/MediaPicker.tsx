import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Search, X, Check, UploadCloud } from 'lucide-react';

interface Asset {
  id: string;
  public_url: string;
  title: string | null;
  category: string | null;
}

interface MediaPickerProps {
  onClose: () => void;
  onSelect: (assets: Asset[]) => void;
  multiple?: boolean;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({ onClose, onSelect, multiple = false }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    try {
      const { data, error } = await supabase.from('assets').select('id, public_url, title, category').order('created_at', { ascending: false });
      if (error) throw error;
      setAssets(data as any || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (asset: Asset) => {
    if (multiple) {
      const isSelected = selectedAssets.some(a => a.id === asset.id);
      if (isSelected) {
        setSelectedAssets(selectedAssets.filter(a => a.id !== asset.id));
      } else {
        setSelectedAssets([...selectedAssets, asset]);
      }
    } else {
      setSelectedAssets([asset]);
    }
  };

  const handleConfirm = () => {
    onSelect(selectedAssets);
    onClose();
  };

  const filteredAssets = assets.filter(a => {
    const matchesSearch = (a.title || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 1000, 
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '1000px',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Manrope' }}>Media Library</h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748B' }}>Select {multiple ? 'images' : 'an image'} to use in your content.</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={24} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '1rem', backgroundColor: '#F8FAFC' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Search images..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
          >
            <option value="All">All Categories</option>
            <option value="Project">Project</option>
            <option value="Service">Service</option>
            <option value="Product">Product</option>
            <option value="Rental">Rental</option>
            <option value="Gallery">Gallery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Grid */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, backgroundColor: '#F1F5F9' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>Loading assets...</div>
          ) : filteredAssets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
              <UploadCloud size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <p>No assets found. Upload them in the Media Library first.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {filteredAssets.map(asset => {
                const isSelected = selectedAssets.some(a => a.id === asset.id);
                return (
                  <div 
                    key={asset.id} 
                    onClick={() => handleSelect(asset)}
                    style={{ 
                      borderRadius: '12px', overflow: 'hidden', backgroundColor: '#FFFFFF',
                      border: `2px solid ${isSelected ? '#0EA5E9' : 'transparent'}`,
                      boxShadow: isSelected ? '0 0 0 4px rgba(14, 165, 233, 0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
                      cursor: 'pointer', position: 'relative', transition: 'all 0.2s'
                    }}
                  >
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: '#0EA5E9', color: '#FFFFFF', borderRadius: '50%', padding: '0.2rem', zIndex: 10 }}>
                        <Check size={16} />
                      </div>
                    )}
                    <div style={{ height: '140px', backgroundColor: '#F1F5F9' }}>
                      <img src={asset.public_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '0.75rem' }}>
                      <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {asset.title || 'Untitled'}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748B' }}>{asset.category || 'Uncategorized'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{ fontSize: '0.875rem', color: '#64748B' }}>
            {selectedAssets.length} asset{selectedAssets.length !== 1 && 's'} selected
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', fontWeight: 600, cursor: 'pointer' }}>
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              disabled={selectedAssets.length === 0}
              style={{ 
                padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none', 
                backgroundColor: selectedAssets.length === 0 ? '#94A3B8' : '#0EA5E9', 
                color: '#FFFFFF', fontWeight: 600, cursor: selectedAssets.length === 0 ? 'not-allowed' : 'pointer' 
              }}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
