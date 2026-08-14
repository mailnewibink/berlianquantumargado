import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Plus, Trash2, Edit3, Image as ImageIcon, Search, X } from 'lucide-react';
import { MediaPicker } from '../../components/admin/MediaPicker';

interface GalleryItem {
  id: string;
  asset_id: string;
  category: string;
  title: string | null;
  description: string | null;
  sort_order: number;
  status: string;
  created_at: string;
  asset?: { public_url: string; title?: string };
}

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  
  // Edit modal
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Rumah Sakit');
  const [editStatus, setEditStatus] = useState('Published');
  const [editSortOrder, setEditSortOrder] = useState(0);
  const [savingEdit, setSavingEdit] = useState(false);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['Rumah Sakit', 'Radiologi', 'Konstruksi', 'Peralatan', 'Laboratorium', 'Lainnya'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    if (!isSupabaseConfigured()) {
      const local = localStorage.getItem('dummy_gallery');
      if (local) {
        try { setItems(JSON.parse(local)); } catch (e) {}
      }
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let galleryList: any[] = [];
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*, asset:assets!gallery_items_asset_id_fkey(public_url, title)')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.warn("PGRST201 fallback in admin GalleryManager.tsx:", error);
        const res = await supabase
          .from('gallery_items')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (res.data) {
          galleryList = res.data as any[];
          const assetIds = galleryList.map((g: any) => g.asset_id).filter(Boolean);
          if (assetIds.length > 0) {
            const { data: assetsData } = await (supabase.from('assets') as any)
              .select('id, public_url, title')
              .in('id', assetIds);
            const assetMap = new Map(((assetsData || []) as any[]).map((a: any) => [a.id, a]));
            galleryList = galleryList.map((g: any) => ({
              ...g,
              asset: assetMap.get(g.asset_id) || null
            }));
          }
        }
      } else {
        galleryList = (data || []) as any[];
      }

      setItems(galleryList);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAssetsToGallery = async (selectedAssets: any[]) => {
    if (selectedAssets.length === 0) return;

    if (!isSupabaseConfigured()) {
      const newItems: GalleryItem[] = selectedAssets.map(asset => ({
        id: Math.random().toString(36).substring(2, 9),
        asset_id: asset.id,
        category: 'Rumah Sakit',
        title: asset.title || 'Gallery Image',
        description: '',
        sort_order: 0,
        status: 'Published',
        created_at: new Date().toISOString(),
        asset: { public_url: asset.public_url, title: asset.title }
      }));
      const updated = [...newItems, ...items];
      setItems(updated);
      localStorage.setItem('dummy_gallery', JSON.stringify(updated));
      return;
    }

    try {
      const payload = selectedAssets.map(asset => ({
        asset_id: asset.id,
        category: 'Rumah Sakit',
        title: asset.title || 'Gallery Image',
        status: 'Published',
        sort_order: 0
      }));

      const { error } = await (supabase.from('gallery_items') as any).insert(payload);
      if (error) throw error;

      fetchGallery();
    } catch (error: any) {
      console.error('Error adding assets to gallery:', error);
      alert(`Failed to add photo(s) to gallery: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove "${title || 'this photo'}" from the gallery?`)) return;

    if (!isSupabaseConfigured()) {
      const updated = items.filter(i => i.id !== id);
      setItems(updated);
      localStorage.setItem('dummy_gallery', JSON.stringify(updated));
      return;
    }

    try {
      const { error } = await supabase.from('gallery_items').delete().eq('id', id);
      if (error) throw error;
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (error: any) {
      console.error('Error deleting gallery item:', error);
      alert(`Failed to delete gallery item: ${error.message || 'Unknown error'}`);
    }
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title || item.asset?.title || '');
    setEditCategory(item.category || 'Rumah Sakit');
    setEditStatus(item.status || 'Published');
    setEditSortOrder(item.sort_order || 0);
  };

  const saveItemEdit = async () => {
    if (!editingItem) return;
    setSavingEdit(true);

    if (!isSupabaseConfigured()) {
      const updated = items.map(i => i.id === editingItem.id ? {
        ...i,
        title: editTitle,
        category: editCategory,
        status: editStatus,
        sort_order: editSortOrder
      } : i);
      setItems(updated);
      localStorage.setItem('dummy_gallery', JSON.stringify(updated));
      setEditingItem(null);
      setSavingEdit(false);
      return;
    }

    try {
      const { error } = await (supabase.from('gallery_items') as any).update({
        title: editTitle,
        category: editCategory,
        status: editStatus,
        sort_order: editSortOrder
      }).eq('id', editingItem.id);

      if (error) throw error;
      setEditingItem(null);
      fetchGallery();
    } catch (error: any) {
      console.error('Error updating gallery item:', error);
      alert(`Failed to update item: ${error.message || 'Unknown error'}`);
    } finally {
      setSavingEdit(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.title || item.asset?.title || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: 'Manrope', color: '#0F172A' }}>Gallery Manager</h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>Upload and manage public showcase photos.</p>
        </div>
        <button 
          onClick={() => setShowMediaPicker(true)} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: '#0EA5E9', 
            color: '#FFFFFF', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '8px', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(14, 165, 233, 0.2)'
          }}
        >
          <Plus size={18} /> Add Photos to Gallery
        </button>
      </div>

      {/* Search & Filter bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input 
            type="text" 
            placeholder="Search gallery photos..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>Loading gallery images...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <ImageIcon size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
          <p style={{ margin: '0 0 1rem 0', fontWeight: 600 }}>No gallery photos found.</p>
          <button 
            onClick={() => setShowMediaPicker(true)}
            style={{ backgroundColor: '#F0F9FF', color: '#0EA5E9', border: '1px solid #BAE6FD', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            + Add First Photo
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', position: 'relative', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              
              {/* Action buttons overlay */}
              <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 10, display: 'flex', gap: '0.35rem' }}>
                <button 
                  onClick={() => openEditModal(item)}
                  title="Edit details"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#334155' }}
                >
                  <Edit3 size={15} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id, item.title || '')}
                  title="Delete photo"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#EF4444' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Photo Preview */}
              <div style={{ height: '180px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
                {item.asset?.public_url ? (
                  <img src={item.asset.public_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>

              {/* Details */}
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 700, margin: '0 0 0.25rem 0', color: '#0F172A', fontSize: '0.95rem' }}>
                    {item.title || item.asset?.title || 'Untitled Photo'}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginBottom: '0.75rem' }}>
                    Category: <strong>{item.category || 'General'}</strong>
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #F1F5F9' }}>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    backgroundColor: item.status === 'Published' ? '#DCFCE7' : '#FEF3C7', 
                    color: item.status === 'Published' ? '#166534' : '#92400E' 
                  }}>
                    {item.status || 'Published'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Order: {item.sort_order || 0}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <MediaPicker 
          multiple={true}
          onClose={() => setShowMediaPicker(false)}
          onSelect={(selectedAssets) => {
            handleAddAssetsToGallery(selectedAssets);
          }}
        />
      )}

      {/* Edit Photo Modal */}
      {editingItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Manrope' }}>Edit Gallery Photo</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Photo Title</label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Category</label>
                <select 
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Status</label>
                  <select 
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Sort Order</label>
                  <input 
                    type="number" 
                    value={editSortOrder}
                    onChange={e => setEditSortOrder(parseInt(e.target.value) || 0)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button onClick={() => setEditingItem(null)} style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={saveItemEdit} disabled={savingEdit} style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: 'none', backgroundColor: '#0EA5E9', color: '#FFFFFF', fontWeight: 600, cursor: savingEdit ? 'not-allowed' : 'pointer' }}>
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
