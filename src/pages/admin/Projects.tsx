import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Plus, Edit3, Trash2, ArrowLeft, Save, Image as ImageIcon, Search, CheckCircle2 } from 'lucide-react';
import { MediaPicker } from '../../components/admin/MediaPicker';

interface Project {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  location: string | null;
  year: string | null; // project_date
  category: string | null;
  short_description: string | null;
  description: string | null;
  cover_asset_id: string | null;
  gallery_assets: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  status: string;
  sort_order: number;
  created_at: string;
  cover_asset?: { public_url: string };
}

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allServices, setAllServices] = useState<{id: string, title: string}[]>([]);
  const [allProducts, setAllProducts] = useState<{id: string, title: string}[]>([]);
  
  const [loading, setLoading] = useState(true);
  
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Relations state for the form
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '', slug: '', client: '', location: '', year: new Date().getFullYear().toString(), 
    category: 'Hospital', short_description: '', description: '', cover_asset_id: null, 
    gallery_assets: [], is_featured: false, is_active: true, status: 'Published', sort_order: 0
  });
  const [formSaving, setFormSaving] = useState(false);
  
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'cover' | 'gallery'>('cover');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = [
    'Hospital', 'Radiology', 'Dental', 'Laboratory', 'Clinic', 'Industrial', 'Other'
  ];
  const statuses = ['Published', 'Draft', 'Archived'];

  useEffect(() => {
    if (view === 'list') fetchProjects();
    fetchRelationsMetadata();
  }, [view]);

  const fetchRelationsMetadata = async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const [servicesRes, productsRes] = await Promise.all([
        supabase.from('services').select('id, title').eq('is_active', true),
        supabase.from('products').select('id, title').eq('is_active', true)
      ]);
      if (servicesRes.data) setAllServices(servicesRes.data as any);
      if (productsRes.data) setAllProducts(productsRes.data as any);
    } catch (e) {
      console.error('Failed to load metadata', e);
    }
  };

  const fetchProjects = async () => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*, cover_asset:assets(public_url)')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data as any || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectRelations = async (projectId: string) => {
    try {
      const [psRes, ppRes] = await Promise.all([
        supabase.from('project_services').select('service_id').eq('project_id', projectId),
        supabase.from('project_products').select('product_id').eq('project_id', projectId)
      ]);
      const sIds = (psRes.data || []).map((x: any) => x.service_id);
      const pIds = (ppRes.data || []).map((x: any) => x.product_id);
      setSelectedServices(sIds);
      setSelectedProducts(pIds);
    } catch (e) {
      console.error('Error fetching relations', e);
      setSelectedServices([]);
      setSelectedProducts([]);
    }
  };

  const handleCreateNew = () => {
    setFormData({
      title: '', slug: '', client: '', location: '', year: new Date().getFullYear().toString(), 
      category: 'Hospital', short_description: '', description: '', cover_asset_id: null, 
      gallery_assets: [], is_featured: false, is_active: true, status: 'Published', sort_order: 0
    });
    setSelectedServices([]);
    setSelectedProducts([]);
    setEditingId(null);
    setView('form');
  };

  const handleEdit = async (project: Project) => {
    setFormData({
      ...project,
      gallery_assets: project.gallery_assets || []
    });
    setEditingId(project.id);
    await fetchProjectRelations(project.id);
    setView('form');
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project.');
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

  const toggleRelation = (type: 'services' | 'products', id: string) => {
    if (type === 'services') {
      setSelectedServices(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
      setSelectedProducts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }
  };

  const saveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    try {
      let savedProjectId = editingId;
      const { cover_asset, ...payload } = formData as any;
      
      // 1. Save Project Data
      if (editingId) {
        const { error } = await (supabase.from('projects') as any).update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { data, error } = await (supabase.from('projects') as any).insert([payload]).select('id').single();
        if (error) throw error;
        savedProjectId = data.id;
      }
      
      if (!savedProjectId) throw new Error("Failed to obtain Project ID for relations");

      // 2. Save Relations (Delete existing then insert new)
      await Promise.all([
        supabase.from('project_services').delete().eq('project_id', savedProjectId),
        supabase.from('project_products').delete().eq('project_id', savedProjectId)
      ]);
      
      if (selectedServices.length > 0) {
        const psData = selectedServices.map(sid => ({ project_id: savedProjectId, service_id: sid }));
        await (supabase.from('project_services') as any).insert(psData);
      }
      
      if (selectedProducts.length > 0) {
        const ppData = selectedProducts.map(pid => ({ project_id: savedProjectId, product_id: pid }));
        await (supabase.from('project_products') as any).insert(ppData);
      }

      setView('list');
    } catch (error: any) {
      console.error('Error saving project:', error);
      alert(error.message || 'Failed to save project.');
    } finally {
      setFormSaving(false);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.client && p.client.toLowerCase().includes(search.toLowerCase()));
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
          <ArrowLeft size={18} /> Back to Projects
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, fontFamily: 'Manrope' }}>
            {editingId ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button 
            onClick={saveForm}
            disabled={formSaving}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0EA5E9', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: formSaving ? 'not-allowed' : 'pointer', fontWeight: 600 }}
          >
            <Save size={18} /> {formSaving ? 'Saving...' : 'Save Project'}
          </button>
        </div>

        <form onSubmit={saveForm} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* BASIC INFORMATION */}
          <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>Basic Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Project Title *</label>
                <input required type="text" value={formData.title} onChange={handleTitleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>URL Slug *</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', backgroundColor: '#F8FAFC' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Category *</label>
                  <select required value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Client Name</label>
                  <input type="text" value={formData.client || ''} onChange={e => setFormData({...formData, client: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Location</label>
                  <input type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Year / Date</label>
                  <input type="text" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Short Description</label>
                <textarea value={formData.short_description || ''} onChange={e => setFormData({...formData, short_description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', minHeight: '80px', fontFamily: 'inherit' }} placeholder="Brief summary for portfolio cards..." />
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

          {/* RELATIONS */}
          <section style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>Relations</h3>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: '#334155' }}>Services Involved</label>
                <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.5rem' }}>
                  {allServices.length === 0 ? <span style={{ color: '#94A3B8', fontSize: '0.85rem', padding: '0.5rem' }}>No services available.</span> : null}
                  {allServices.map(s => (
                    <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#334155', borderRadius: '4px', backgroundColor: selectedServices.includes(s.id) ? '#F0F9FF' : 'transparent' }}>
                      <input type="checkbox" checked={selectedServices.includes(s.id)} onChange={() => toggleRelation('services', s.id)} style={{ width: '16px', height: '16px' }} />
                      {s.title}
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: '#334155' }}>Products Involved</label>
                <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.5rem' }}>
                  {allProducts.length === 0 ? <span style={{ color: '#94A3B8', fontSize: '0.85rem', padding: '0.5rem' }}>No products available.</span> : null}
                  {allProducts.map(p => (
                    <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#334155', borderRadius: '4px', backgroundColor: selectedProducts.includes(p.id) ? '#F0F9FF' : 'transparent' }}>
                      <input type="checkbox" checked={selectedProducts.includes(p.id)} onChange={() => toggleRelation('products', p.id)} style={{ width: '16px', height: '16px' }} />
                      {p.title}
                    </label>
                  ))}
                </div>
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
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                  <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                  Is Featured Project
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                  <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                  Is Active (Visible on public site)
                </label>
              </div>
            </div>
          </section>

          {/* Form Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setView('list')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={formSaving} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#0EA5E9', color: '#FFFFFF', fontWeight: 600, cursor: formSaving ? 'not-allowed' : 'pointer' }}>
              {formSaving ? 'Saving...' : 'Save Project'}
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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: 'Manrope' }}>Projects</h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>Manage company portfolio and case studies.</p>
        </div>
        <button onClick={handleCreateNew} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0EA5E9', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          <Plus size={18} /> New Project
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input 
            type="text" 
            placeholder="Search projects by title or client..." 
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
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Project</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Client / Loc</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#334155', fontSize: '0.85rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>Loading projects...</td></tr>
            ) : filteredProjects.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>No projects found.</td></tr>
            ) : (
              filteredProjects.map(p => (
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
                        <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {p.title} 
                          {p.is_featured && <span style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', fontSize: '0.65rem', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>Featured</span>}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.9rem' }}>{p.category}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                    <div style={{ color: '#0F172A', fontWeight: 500 }}>{p.client || '-'}</div>
                    <div style={{ color: '#64748B', fontSize: '0.8rem' }}>{p.location || '-'} {p.year ? `(${p.year})` : ''}</div>
                  </td>
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
