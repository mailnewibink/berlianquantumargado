import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbox } from '../components/Lightbox';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface GalleryItem {
  url: string;
  title: string;
  category: string;
}

export const Gallery: React.FC = () => {
  const { t } = useLanguage();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dbGallery, setDbGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchDbGallery = async () => {
      if (!isSupabaseConfigured()) {
        const local = localStorage.getItem('dummy_gallery');
        if (local) {
          try {
            const parsed = JSON.parse(local);
            const mapped = parsed.filter((p: any) => p.status === 'Published').map((p: any) => ({
              url: p.asset?.public_url || '/images/hero_background.png',
              title: p.title || p.asset?.title || 'Gallery Image',
              category: p.category || 'Gallery'
            }));
            if (mapped.length > 0) setDbGallery(mapped);
          } catch (e) {}
        }
        return;
      }
      try {
        let galleryData: any[] = [];
        let { data, error } = await supabase
          .from('gallery_items')
          .select('*, asset:assets!gallery_items_asset_id_fkey(*)')
          .eq('status', 'Published')
          .order('sort_order', { ascending: true });

        if (error) {
          console.warn("PGRST201 fallback in public Gallery.tsx:", error);
          const res = await supabase.from('gallery_items').select('*').eq('status', 'Published').order('sort_order', { ascending: true });
          if (res.data) {
            galleryData = res.data as any[];
            const assetIds = galleryData.map((g: any) => g.asset_id).filter(Boolean);
            if (assetIds.length > 0) {
              const { data: assetsData } = await (supabase.from('assets') as any).select('id, public_url, title').in('id', assetIds);
              const assetMap = new Map(((assetsData || []) as any[]).map((a: any) => [a.id, a]));
              galleryData = galleryData.map((g: any) => ({
                ...g,
                asset: assetMap.get(g.asset_id)
              }));
            }
          }
        } else {
          galleryData = (data || []) as any[];
        }

        if (galleryData.length > 0) {
          const mapped = galleryData.map((p: any) => ({
            url: p.asset?.public_url || '/images/hero_background.png',
            title: p.title || p.asset?.title || 'Gallery Image',
            category: p.category || 'Gallery'
          }));
          setDbGallery(mapped);
        }
      } catch (e) { console.error(e); }
    };
    fetchDbGallery();
  }, []);

  const galleryItems = dbGallery;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* Page Header */}
      <section
        style={{
          padding: '6rem 0 4rem 0',
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.25em', fontWeight: 600 }}>{t('galleryPage.tag')}</span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('galleryPage.heading')}</h1>
            <p style={{ maxWidth: '750px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>{t('galleryPage.desc')}</p>
          </motion.div>
        </div>
      </section>

      {/* Masonry / Grid Gallery Section */}
      <section className="section-padding">
        <div className="container">
          {galleryItems.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="gallery-item-card"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: 'var(--shadow-small)',
                    border: '1px solid var(--glass-border)',
                    height: '240px',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                >
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img
                      src={item.url}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    
                    {/* Photo Hover overlay with text */}
                    <div
                      className="gallery-overlay"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.85) 100%)',
                        opacity: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '1.5rem',
                        color: '#FFFFFF',
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          color: 'var(--color-cyan)',
                          letterSpacing: '0.1em',
                          fontWeight: 700,
                          marginBottom: '0.25rem',
                        }}
                      >
                        {item.category}
                      </span>
                      <h4 style={{ fontFamily: 'Manrope', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                Belum ada foto galeri yang dipublikasikan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Trigger */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* Embedded styles for Pinterest Masonry Columns */}
      <style>{`
        .masonry-wrapper {
          column-count: 3;
          column-gap: 24px;
        }
        @media (max-width: 992px) {
          .masonry-wrapper {
            column-count: 2;
          }
        }
        @media (max-width: 576px) {
          .masonry-wrapper {
            column-count: 1;
          }
        }
        
        .image-hover-wrapper:hover img {
          transform: scale(1.04);
        }
        .image-hover-wrapper:hover .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>

    </div>
  );
};
