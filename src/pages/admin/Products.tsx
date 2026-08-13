import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Plus, Edit3, Trash2, ArrowLeft, Save, Image as ImageIcon, Search, CheckCircle2 } from 'lucide-react';
import { MediaPicker } from '../../components/admin/MediaPicker';

interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  category: string | null;
  specifications: string | null;
  cover_asset_id: string | null;
  gallery_assets: string[] | null;
  features: string[] | null;
  applications: string[] | null;
  sort_order: number;
  is_active: boolean;
  status: string;
  created_at: string;
  cover_asset?: { public_url: string };
}

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '', slug: '', sku: '', short_description: '', description: '', category: 'Radiation Shielding',
    specifications: '', cover_asset_id: null, gallery_assets: [], features: [], applications: [],
    sort_order: 0, status: 'Published', is_active: true
  });
  const [formSaving, setFormSaving] = useState(false);
  
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'cover' | 'gallery'>('cover');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = [
    'Lead Sheet', 'Lead Glass', 'Lead Door', 'Radiation Shielding', 
    'Medical / Hospital Equipment', 'Cleanroom Equipment', 'Laboratory Furniture', 'Other'
  ];
  const statuses = ['Published', 'Draft', 'Archived'];

  useEffect(() => {
    if (view === 'list') fetchProducts();
  }, [view]);

  const fetchProducts = async () => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*, cover_asset:assets(public_url)')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data as any || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setFormData({
      title: '', slug: '', sku: '', short_description: '', description: '', category: 'Radiation Shielding',
      specifications: '', cover_asset_id: null, gallery_assets: [], features: [], applications: [],
      sort_order: 0, status: 'Published', is_active: true
    });
    setEditingId(null);
    setView('form');
  };

  const handleEdit = (product: Product) => {
    setFormData({
      ...product,
      features: product.features || [],
      gallery_assets: product.gallery_assets || [],
      applications: product.applications || []
    });
    setEditingId(product.id);
    setView('form');
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      title,
      slug: !editingId || prev.slug === generateSlug(prev.title || '') ? generateSlug(title) : prev.slug
    }));
  };

  const handleArrayChange = (field: 'features' | 'applications', value: string) => {
    const arr = value.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    setFormData(prev => ({ ...prev, [field]: arr }));
  };

  const saveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    try {
      if (editingId) {
        const { error } = await (supabase.from('products') as any).update(formData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from('products') as any).insert([formData]);
        if (error) throw error;
      }
      setView('list');
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert(error.message || 'Failed to save product.');
    } finally {
      setFormSaving(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  if (view === 'form') {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
        <button 
          onClick={() => setView('list')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> Back to Products
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, fontFamily: 'Manrope' }}>
            {editingId ? 'Edit Product' : 'Create New Product'}
          </h2>
          <button 
            onClick={saveForm}
            disabled={formSaving}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0EA5E9', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: formSaving ? 'not-allowed' : 'pointer', fontWeight: 600 }}
          >
            <Save size={18} /> {formSaving ? 'Saving...' : 'Save Product'}
          </button>
        </div>

        <form onSubmit={saveForm} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* BASIC INFORMATION */}
          <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>Basic Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Product Name *</label>
                <input required type="text" value={formData.title} onChange={handleTitleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>URL Slug *</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', backgroundColor: '#F8FAFC' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>SKU (Optional)</label>
                  <input type="text" value={formData.sku || ''} onChange={e => setFormData({...formData, sku: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Category *</label>
                  <select required value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Short Description</label>
                <textarea value={formData.short_description || ''} onChange={e => setFormData({...formData, short_description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', minHeight: '80px', fontFamily: 'inherit' }} placeholder="Brief summary for product cards..." />
              </div>
            </div>
          </section>

          {/* MEDIA */}
          <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>Media</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Cover Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '8px', border: '1px dashed #CBD5E1', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {formData.cover_asset_id ? (
                      <span style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={24} /> Selected</span>
                    ) : (
                      <ImageIcon size={32} color="#CBD5E1" />
                    )}
                  </div>
                  <div>
                    <button type="button" onClick={() => { setMediaTarget('cover'); setShowMediaPicker(true); }} style={{ backgroundColor: '#F1F5F9', color: '#334155', border: '1px solid #E2E8F0', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                      {formData.cover_asset_id ? 'Change Cover Image' : 'Select Cover Image'}
                    </button>
                    {formData.cover_asset_id && (
                      <button type="button" onClick={() => setFormData({...formData, cover_asset_id: null})} style={{ background: 'none', border: 'none', color: '#EF4444', marginLeft: '1rem', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</button>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Gallery Images</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <button type="button" onClick={() => { setMediaTarget('gallery'); setShowMediaPicker(true); }} style={{ backgroundColor: '#F1F5F9', color: '#334155', border: '1px solid #E2E8F0', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                      Select Gallery Images ({formData.gallery_assets?.length || 0} selected)
                   </button>
                   {(formData.gallery_assets?.length || 0) > 0 && (
                      <button type="button" onClick={() => setFormData({...formData, gallery_assets: []})} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.85rem' }}>Clear Gallery</button>
                   )}
                </div>
              </div>
            </div>
          </section>

          {/* DESCRIPTION */}
          <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>Full Description</h3>
            <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', minHeight: '200px', fontFamily: 'inherit' }} />
          </section>

          {/* SPECIFICATIONS / DETAILS */}
          <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>Specifications & Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Specifications (Markdown/Text)</label>
                <textarea 
                  value={formData.specifications || ''} 
                  onChange={e => setFormData({...formData, specifications: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', minHeight: '120px', fontFamily: 'inherit' }} 
                  placeholder="Thickness: 2mm Pb&#10;Material: Pure Lead&#10;..." 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Key Features (One per line)</label>
                <textarea 
                  value={formData.features?.join('\n') || ''} 
                  onChange={e => handleArrayChange('features', e.target.value)} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', minHeight: '100px', fontFamily: 'inherit' }} 
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Applications (One per line)</label>
                <textarea 
                  value={formData.applications?.join('\n') || ''} 
                  onChange={e => handleArrayChange('applications', e.target.value)} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', minHeight: '100px', fontFamily: 'inherit' }} 
                />
              </div>
            </div>
          </section>

          {/* PUBLISHING / STATUS */}
          <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>Publishing & Status</h3>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Status</label>
                <select value={formData.status || 'Published'} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Sort Order</label>
                <input type="number" value={formData.sort_order || 0} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                  <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                  Is Active (Visible)
                </label>
              </div>
            </div>
          </section>

          {/* Form Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setView('list')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={formSaving} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#0EA5E9', color: '#FFFFFF', fontWeight: 600, cursor: formSaving ? 'not-allowed' : 'pointer' }}>
              {formSaving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
        
        {/* Media Picker Modal Overlay */}
        {showMediaPicker && (
          <MediaPicker 
            multiple={mediaTarget === 'gallery'}
            onClose={() => setShowMediaPicker(false)}
            onSelect={(assets) => {
              if (mediaTarget === 'cover') {
                setFormData(prev => ({ ...prev, cover_asset_id: assets[0]?.id || null }));
              } else {
                setFormData(prev => ({ ...prev, gallery_assets: assets.map(a => a.id) }));
              }
            }}
          />
        )}
      </div>
    );
  }

  // LIST VIEW
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: 'Manrope' }}>Products</h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>Manage products sold by BQA.</p>
        </div>
        <button onClick={handleCreateNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0EA5E9', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          <Plus size={18} /> New Product
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input 
            type="text" 
            placeholder="Search products..." 
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

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Product</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Order</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>Loading products...</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>No products found.</td></tr>
            ) : (
              filteredProducts.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#F1F5F9', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {p.cover_asset?.public_url ? (
                           <img src={p.cover_asset.public_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         ) : (
                           <ImageIcon size={20} color="#CBD5E1" />
                         )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.1rem' }}>{p.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.sku ? `SKU: ${p.sku}` : `/${p.slug}`}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.9rem' }}>{p.category}</td>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.9rem' }}>{p.sort_order}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, 
                      backgroundColor: p.status === 'Published' && p.is_active ? '#DCFCE7' : '#FEF3C7', 
                      color: p.status === 'Published' && p.is_active ? '#166534' : '#92400E' 
                    }}>
                      {p.is_active ? p.status : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(p)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', marginRight: '0.5rem', padding: '0.5rem' }}><Edit3 size={18} /></button>
                    <button onClick={() => handleDelete(p.id, p.title)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
