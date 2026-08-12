import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbox } from '../components/Lightbox';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryItem {
  url: string;
  title: string;
  category: string;
}

export const Gallery: React.FC = () => {
  const { t, language } = useLanguage();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = language === 'id' ? [
    { url: "/images/hero_background.png", title: "Tata Letak Koridor Bedah Cleanroom", category: "Rumah Sakit" },
    { url: "/images/radiation_shielding.png", title: "Jendela & Konsol Tinjau Berlapis Timbal", category: "Radiologi" },
    { url: "/images/hospital_construction.png", title: "Struktur Rangka Plafon Ruang Bedah", category: "Konstruksi" },
    { url: "/images/medical_equipment.png", title: "Lampu Bedah Kubah Ganda Terintegrasi", category: "Peralatan" },
    { url: "/images/scrub_sink.png", title: "Stasiun Cuci Baja Tahan Karat Premium", category: "Laboratorium" },
    { url: "/images/pass_box.png", title: "Pass Box Interlock Cleanroom Steril", category: "Laboratorium" },
    { url: "/images/hospital_construction.png", title: "Unit Filtrasi Plafon Laminar Terekspos", category: "Konstruksi" },
    { url: "/images/radiation_shielding.png", title: "Batas Rangka Pintu Timbal Pelindung", category: "Radiologi" }
  ] : [
    { url: "/images/hero_background.png", title: "Cleanroom Surgical Corridor Layout", category: "Hospital" },
    { url: "/images/radiation_shielding.png", title: "Lead Shielded Viewing Window & Console", category: "Radiology" },
    { url: "/images/hospital_construction.png", title: "Surgical Suite Ceiling Frame Structure", category: "Construction" },
    { url: "/images/medical_equipment.png", title: "Integrated Double Dome Surgical Lights", category: "Equipment" },
    { url: "/images/scrub_sink.png", title: "Premium Stainless Steel Scrub Station", category: "Laboratory" },
    { url: "/images/pass_box.png", title: "Sterile Cleanroom Interlock Pass Box", category: "Laboratory" },
    { url: "/images/hospital_construction.png", title: "Exposed Laminar Ceiling Filtration Unit", category: "Construction" },
    { url: "/images/radiation_shielding.png", title: "Shielded Lead Door Frame Boundary", category: "Radiology" }
  ];

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

      {/* Masonry Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="masonry-wrapper">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="masonry-item glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                onClick={() => setLightboxIndex(idx)}
                style={{
                  cursor: 'pointer',
                  marginBottom: '24px',
                  breakInside: 'avoid',
                  overflow: 'hidden',
                  padding: 0,
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }} className="image-hover-wrapper">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
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
