import React, { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { UploadCloud, Image as ImageIcon, Trash2, Edit3, Search, CheckCircle2, X, AlertCircle } from 'lucide-react';

export interface Asset {
  id: string;
  filename: string;
  storage_path: string;
  public_url: string;
  title: string | null;
  description: string | null;
  alt_text: string | null;
  category: string | null;
  tags: string[] | null;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  errorMsg?: string;
}

export const AdminAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Upload Queue State
  const [uploadQueue, setUploadQueue] = useState<UploadTask[]>([]);
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  const [selectedAssetIds, setSelectedAssetIds] = useState<Set<string>>(new Set());
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['Project', 'Service', 'Product', 'Rental', 'Gallery', 'Other'];

  useEffect(() => {
    fetchAssets();
  }, [sortBy]);

  // Upload Queue Processor
  useEffect(() => {
    const processQueue = async () => {
      const pendingTask = uploadQueue.find(t => t.status === 'pending');
      if (!pendingTask) return;

      // Mark as uploading
      setUploadQueue(prev => prev.map(t => t.id === pendingTask.id ? { ...t, status: 'uploading' } : t));

      const file = pendingTask.file;
      let filePath = '';
      let uploadedToStorage = false;

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        filePath = `${fileName}`;

        // 1. Upload to Storage
        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, file, { upsert: false });

        if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);
        
        uploadedToStorage = true;
        setUploadQueue(prev => prev.map(t => t.id === pendingTask.id ? { ...t, progress: 50 } : t));

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);

        // 3. Smart title parsing
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        const smartTitle = nameWithoutExt.replace(/[-_]/g, ' ').replace(/([A-Z])/g, ' $1').trim().replace(/\s+/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        // 4. Insert to Database
        const { error: dbError } = await (supabase.from('assets') as any).insert([{
            filename: file.name,
            storage_path: filePath,
            public_url: publicUrl,
            title: smartTitle,
            category: 'Other',
            mime_type: file.type,
            file_size: file.size
        } as any]);

        if (dbError) throw new Error(`Database insert failed: ${dbError.message}`);

        // Success
        setUploadQueue(prev => prev.map(t => t.id === pendingTask.id ? { ...t, status: 'success', progress: 100 } : t));
        fetchAssets(); // Refresh silently

      } catch (error: any) {
        console.error('Error in upload task:', error);
        
        // Orphan Cleanup
        if (uploadedToStorage) {
          try {
            await supabase.storage.from('assets').remove([filePath]);
            console.log(`Cleaned up orphan file in storage: ${filePath}`);
          } catch (cleanupError) {
            console.error('Failed to cleanup orphan file:', cleanupError);
          }
        }

        setUploadQueue(prev => prev.map(t => t.id === pendingTask.id ? { ...t, status: 'error', errorMsg: error.message || 'Unknown error' } : t));
      }
    };

    processQueue();
  }, [uploadQueue]);

  const fetchAssets = async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      let query = supabase.from('assets').select('*');
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: true });
      }
      const { data, error } = await query;
      if (error) throw error;
      setAssets(data as any || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0 || !isSupabaseConfigured()) return;
    
    const newTasks: UploadTask[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(`File ${file.name} is not a valid image format. Allowed: JPG, PNG, WEBP.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max 5MB.`);
        continue;
      }
      newTasks.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        progress: 0,
        status: 'pending'
      });
    }

    setUploadQueue(prev => [...prev, ...newTasks]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearCompletedUploads = () => {
    setUploadQueue(prev => prev.filter(t => t.status !== 'success'));
  };

  const retryUpload = (id: string) => {
    setUploadQueue(prev => prev.map(t => t.id === id ? { ...t, status: 'pending', errorMsg: undefined, progress: 0 } : t));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const toggleSelectAsset = (id: string) => {
    const newSet = new Set(selectedAssetIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedAssetIds(newSet);
  };

  const handleDeleteSelected = async () => {
    if (selectedAssetIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedAssetIds.size} assets?`)) return;

    try {
      const assetsToDelete = assets.filter(a => selectedAssetIds.has(a.id));
      const storagePaths = assetsToDelete.map(a => a.storage_path);
      await supabase.storage.from('assets').remove(storagePaths);
      await supabase.from('assets').delete().in('id', Array.from(selectedAssetIds));
      
      setSelectedAssetIds(new Set());
      fetchAssets();
    } catch (error) {
      console.error('Error deleting assets:', error);
    }
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAsset) return;

    try {
      const { error } = await (supabase.from('assets') as any).update({
          title: editingAsset.title,
          description: editingAsset.description,
          alt_text: editingAsset.alt_text,
          category: editingAsset.category,
          tags: editingAsset.tags
        } as any)
        .eq('id', editingAsset.id);

      if (error) throw error;
      setEditingAsset(null);
      fetchAssets();
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = categoryFilter === 'All' || asset.category === categoryFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      (asset.title && asset.title.toLowerCase().includes(searchLower)) ||
      asset.filename.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', fontFamily: 'Manrope' }}>Media Library</h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>Centralized asset management for all content.</p>
        </div>
        {selectedAssetIds.size > 0 && (
          <button 
            onClick={handleDeleteSelected}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
          >
            <Trash2 size={16} /> Delete {selectedAssetIds.size} Assets
          </button>
        )}
      </div>

      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ 
          border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '3rem 2rem', 
          textAlign: 'center', backgroundColor: '#FFFFFF', marginBottom: '2rem', transition: 'all 0.2s' 
        }}
      >
        <UploadCloud size={48} style={{ color: '#94A3B8', margin: '0 auto 1rem auto' }} />
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Upload Media Files</h3>
        <p style={{ color: '#64748B', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>Drag and drop images here, or click to browse</p>
        
        <input 
          type="file" 
          ref={fileInputRef}
          multiple 
          accept="image/jpeg, image/png, image/webp" 
          onChange={(e) => handleFileUpload(e.target.files)} 
          style={{ display: 'none' }} 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          style={{ backgroundColor: '#0EA5E9', color: '#FFFFFF', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s' }}
        >
          Select Files
        </button>
        <p style={{ margin: '1rem 0 0 0', fontSize: '0.8rem', color: '#94A3B8' }}>Supports JPG, PNG, WEBP (Max 5MB per file)</p>
      </div>

      {uploadQueue.length > 0 && (
        <div style={{ marginBottom: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Upload Queue</h3>
            <button onClick={clearCompletedUploads} style={{ background: 'none', border: 'none', color: '#0EA5E9', fontSize: '0.85rem', cursor: 'pointer' }}>Clear Completed</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {uploadQueue.map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <ImageIcon size={20} style={{ color: '#94A3B8' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.file.name}</span>
                </div>
                
                <div style={{ flex: 1, height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: task.status === 'error' ? '#EF4444' : '#0EA5E9', width: `${task.progress}%`, transition: 'width 0.3s' }}></div>
                </div>

                <div style={{ width: '100px', textAlign: 'right', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  {task.status === 'pending' && <span style={{ color: '#94A3B8' }}>Pending</span>}
                  {task.status === 'uploading' && <span style={{ color: '#0EA5E9' }}>Uploading</span>}
                  {task.status === 'success' && <span style={{ color: '#10B981' }}><CheckCircle2 size={18} /></span>}
                  {task.status === 'error' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444' }}>
                      <AlertCircle size={18} /> <span style={{ fontSize: '0.75rem' }}>{task.errorMsg}</span>
                      <button onClick={() => retryUpload(task.id)} style={{ background: 'none', border: 'none', color: '#0EA5E9', cursor: 'pointer', fontSize: '0.75rem' }}>Retry</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Grid */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input 
            type="text" 
            placeholder="Search by filename or title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>Loading media library...</div>
      ) : filteredAssets.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', color: '#64748B' }}>
          No assets found.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {filteredAssets.map(asset => {
            const isSelected = selectedAssetIds.has(asset.id);
            return (
              <div 
                key={asset.id} 
                onClick={() => toggleSelectAsset(asset.id)}
                style={{ 
                  backgroundColor: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${isSelected ? '#0EA5E9' : '#E2E8F0'}`, 
                  position: 'relative', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 0 0 4px rgba(14, 165, 233, 0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                {isSelected && (
                  <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 10, color: '#0EA5E9', backgroundColor: '#FFFFFF', borderRadius: '50%', display: 'flex' }}>
                    <CheckCircle2 size={24} />
                  </div>
                )}
                
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 10 }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setEditingAsset(asset); }}
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }}
                  >
                    <Edit3 size={16} />
                  </button>
                </div>

                <div style={{ height: '160px', backgroundColor: '#F1F5F9' }}>
                  <img src={asset.public_url} alt={asset.alt_text || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ padding: '1rem' }}>
                  <p style={{ margin: '0 0 0.25rem 0', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {asset.title || asset.filename}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {asset.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      {asset.file_size ? `${(asset.file_size / 1024 / 1024).toFixed(1)} MB` : ''}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingAsset && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '500px', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Edit Asset Metadata</h3>
              <button onClick={() => setEditingAsset(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={saveEdit} style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Title</label>
                <input type="text" value={editingAsset.title || ''} onChange={(e) => setEditingAsset({...editingAsset, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                <textarea value={editingAsset.description || ''} onChange={(e) => setEditingAsset({...editingAsset, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box', minHeight: '80px', fontFamily: 'inherit' }} />
              </div>
              
              <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Category</label>
                  <select value={editingAsset.category || 'Other'} onChange={(e) => setEditingAsset({...editingAsset, category: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Alt Text</label>
                  <input type="text" value={editingAsset.alt_text || ''} onChange={(e) => setEditingAsset({...editingAsset, alt_text: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setEditingAsset(null)} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#0EA5E9', color: '#FFFFFF', fontWeight: 600, cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
