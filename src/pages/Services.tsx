import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ImageSlider } from '../components/ImageSlider';

export const Services: React.FC = () => {
  const { t } = useLanguage();
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchDbServices = async () => {
      if (!isSupabaseConfigured()) return;
      try {
        let servicesData: any[] = [];
        let { data, error } = await supabase.from('services').select('*, cover_asset:assets!services_cover_asset_id_fkey(*)').eq('status', 'Published').eq('is_active', true);
        if (error) {
          console.warn("PGRST201 fallback in public Services.tsx:", error);
          const res = await supabase.from('services').select('*').eq('status', 'Published').eq('is_active', true);
          if (res.data) {
            servicesData = res.data as any[];
            const coverIds = servicesData.map((s: any) => s.cover_asset_id).filter(Boolean);
            if (coverIds.length > 0) {
              const { data: assetsData } = await (supabase.from('assets') as any).select('id, public_url').in('id', coverIds);
              const assetMap = new Map(((assetsData || []) as any[]).map((a: any) => [a.id, a.public_url]));
              servicesData = servicesData.map((s: any) => ({
                ...s,
                cover_asset: s.cover_asset_id ? { public_url: assetMap.get(s.cover_asset_id) } : null
              }));
            }
          }
        } else {
          servicesData = (data || []) as any[];
        }
        if (servicesData.length > 0) {
          const allAssetIds: string[] = [];
          servicesData.forEach((s: any) => {
            if (s.cover_asset_id) allAssetIds.push(s.cover_asset_id);
            if (Array.isArray(s.gallery_assets)) {
              s.gallery_assets.forEach((gId: string) => { if (gId) allAssetIds.push(gId); });
            }
          });

          let assetMap = new Map<string, string>();
          if (allAssetIds.length > 0) {
            const { data: assetsData } = await (supabase.from('assets') as any).select('id, public_url').in('id', allAssetIds);
            if (assetsData) {
              assetMap = new Map((assetsData as any[]).map((a: any) => [a.id, a.public_url]));
            }
          }

          const mapped = servicesData.map((s: any) => {
            const coverUrl = s.cover_asset?.public_url || assetMap.get(s.cover_asset_id);
            const galleryUrls = Array.isArray(s.gallery_assets) 
              ? s.gallery_assets.map((id: string) => assetMap.get(id) || id).filter((url: any) => typeof url === 'string' && url.startsWith('http'))
              : [];
            
            const imageList = Array.from(new Set([coverUrl, ...galleryUrls].filter(Boolean) as string[]));

            return {
              id: s.slug || s.id,
              image: coverUrl || '',
              images: imageList,
              icon: <CheckCircle size={28} />,
              title: s.title,
              desc: s.description || s.short_description || '',
              details: s.features || []
            };
          });
          setDbServices(mapped);
        }
      } catch (e) { console.error(e); }
    };
    fetchDbServices();
  }, []);

  const serviceItems = dbServices;
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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.25em', fontWeight: 600 }}>{t('servicesPage.tag')}</span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('servicesPage.heading')}</h1>
            <p style={{ maxWidth: '750px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>{t('servicesPage.desc')}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-padding">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {serviceItems.length > 0 ? (
            serviceItems.map((item, idx) => (
              <div
                key={idx}
                id={item.id}
                style={{
                  display: 'flex',
                  flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: '4rem',
                  flexWrap: 'wrap',
                }}
                className="service-row"
              >
                {/* Image box */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ flex: '1 1 450px' }}
                >
                  <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-medium)', border: '1px solid var(--glass-border)' }}>
                    <ImageSlider
                      images={item.images || [item.image]}
                      alt={item.title}
                      height="350px"
                    />
                  </div>
                </motion.div>

                {/* Text & Capability Details box */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  style={{ flex: '1.2 1 450px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--color-medical-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontFamily: 'Manrope', fontWeight: 800 }}>{item.title}</h2>
                  </div>

                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {item.desc}
                  </p>

                  {/* Capabilities check bullet list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {item.details.map((bullet: string, bIdx: number) => (
                      <div key={bIdx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <CheckCircle size={18} style={{ color: 'var(--color-cyan)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                Belum ada layanan yang dipublikasikan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quality Standards Panel */}
      <section
        className="section-padding"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--glass-border)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginBottom: '1.5rem' }}>{t('servicesPage.qualityHeading')}</h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 3rem auto', color: 'var(--text-secondary)' }}>{t('servicesPage.qualityDesc')}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="glass-card" style={{ padding: '1.5rem 2.5rem', borderRadius: '16px' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-medical-blue)' }}>BAPETEN Standard Shielding</span>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem 2.5rem', borderRadius: '16px' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-cyan)' }}>ISO 13485:2016 Compliant</span>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem 2.5rem', borderRadius: '16px' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-medical-blue)' }}>MOH RI Class A/B Specifications</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 992px) {
          .service-row {
            flex-direction: column !important;
            gap: 2rem !important;
          }
        }
      `}</style>

    </div>
  );
};
