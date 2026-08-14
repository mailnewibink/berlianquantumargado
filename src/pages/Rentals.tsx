import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ImageSlider } from '../components/ImageSlider';

interface RentalItem {
  id: string;
  title: string;
  category: string;
  specs: string;
  desc: string;
  availability: string;
  terms: string;
  image: string;
  images?: string[];
}

export const Rentals: React.FC = () => {
  const { language } = useLanguage();
  const [dbRentals, setDbRentals] = useState<RentalItem[]>([]);

  useEffect(() => {
    const fetchDbRentals = async () => {
      if (!isSupabaseConfigured()) return;
      try {
        let rentalsData: any[] = [];
        let { data, error } = await supabase.from('rentals').select('*, cover_asset:assets!rentals_cover_asset_id_fkey(*)').eq('status', 'Published').eq('is_active', true);
        if (error) {
          console.warn("PGRST201 fallback in public Rentals.tsx:", error);
          const res = await supabase.from('rentals').select('*').eq('status', 'Published').eq('is_active', true);
          if (res.data) {
            rentalsData = res.data as any[];
            const coverIds = rentalsData.map((r: any) => r.cover_asset_id).filter(Boolean);
            if (coverIds.length > 0) {
              const { data: assetsData } = await (supabase.from('assets') as any).select('id, public_url').in('id', coverIds);
              const assetMap = new Map(((assetsData || []) as any[]).map((a: any) => [a.id, a.public_url]));
              rentalsData = rentalsData.map((r: any) => ({
                ...r,
                cover_asset: r.cover_asset_id ? { public_url: assetMap.get(r.cover_asset_id) } : null
              }));
            }
          }
        } else {
          rentalsData = (data || []) as any[];
        }
        if (rentalsData.length > 0) {
          const mapped = rentalsData.map((r: any) => ({
            id: r.id,
            title: r.title,
            category: r.category || 'Equipment Rental',
            specs: r.specifications || '',
            desc: r.description || r.short_description || '',
            availability: r.availability_status || 'AVAILABLE',
            terms: r.rental_terms || 'Harian / Mingguan / Bulanan',
            image: r.cover_asset?.public_url || '/images/medical_equipment.png'
          }));
          setDbRentals(mapped);
        }
      } catch (e) { console.error(e); }
    };
    fetchDbRentals();
  }, []);

  const staticRentals: RentalItem[] = language === 'id' ? [
    {
      id: "r-1",
      title: "Detektor & Meteran Kebocoran Radiasi (Survey Meter)",
      category: "Alat Ukur Radiasi",
      specs: "Kalibrasi BAPETEN Terdaftar | Range: 0.1 μSv/h - 100 mSv/h",
      desc: "Perangkat survey meter portabel certified untuk inspeksi kebocoran radiasi di ruang CT Scan, X-Ray, dan Cath Lab.",
      availability: "Tersedia",
      terms: "Sewa Harian / Mingguan",
      image: "/images/radiation_shielding.png"
    },
    {
      id: "r-2",
      title: "Unit Pencuci Tangan Bedah Portabel (Mobile Scrub Sink)",
      category: "Fasilitas Klinis",
      specs: "Material: SUS 304 | Sensor Infra Merah | Sistem Filter UV",
      desc: "Mobile scrub sink siap pakai dengan sistem air steril terintegrasi untuk kebutuhan instalasi darurat atau renovasi kamar ruang operasi.",
      availability: "Tersedia",
      terms: "Sewa Bulanan / Proyek",
      image: "/images/scrub_sink.png"
    },
    {
      id: "r-3",
      title: "Unit Filter Air Bersih Cleanroom (Laminar Air Mobile)",
      category: "Peralatan Cleanroom",
      specs: "HEPA Filter H14 (99.995%) | Airflow Velocity: 0.45 m/s",
      desc: "Unit pemurni udara laminar bergerak untuk menciptakan zona steril sementara selama pengerjaan konstruksi atau perawatan ruang medis.",
      availability: "Tersedia",
      terms: "Sewa Mingguan / Bulanan",
      image: "/images/pass_box.png"
    }
  ] : [
    {
      id: "r-1",
      title: "Radiation Leakage Detector (Survey Meter)",
      category: "Radiation Metering",
      specs: "BAPETEN Calibrated | Range: 0.1 μSv/h - 100 mSv/h",
      desc: "Certified portable survey meter for inspecting radiation shielding integrity in CT Scan and X-Ray suites.",
      availability: "Available",
      terms: "Daily / Weekly Rental",
      image: "/images/radiation_shielding.png"
    },
    {
      id: "r-2",
      title: "Mobile Surgical Scrub Sink Unit",
      category: "Clinical Facilities",
      specs: "Material: SUS 304 | Infrared Sensor | Integrated UV Filtration",
      desc: "Plug-and-play mobile scrub station with sterile water system for temporary operating suite setups.",
      availability: "Available",
      terms: "Monthly / Project Rental",
      image: "/images/scrub_sink.png"
    },
    {
      id: "r-3",
      title: "Mobile Cleanroom HEPA Filter Unit",
      category: "Cleanroom Equipment",
      specs: "HEPA Filter H14 (99.995%) | Airflow Velocity: 0.45 m/s",
      desc: "Mobile laminar airflow purification unit to establish temporary sterile clean zones during facility maintenance.",
      availability: "Available",
      terms: "Weekly / Monthly Rental",
      image: "/images/pass_box.png"
    }
  ];

  const rentalItems = dbRentals.length > 0 ? [...dbRentals, ...staticRentals] : staticRentals;

  const createWhatsAppRentalInquiry = (itemTitle: string) => {
    return `https://wa.me/6281234567890?text=Halo%20PT%20Berlian%20Quantum%20Argado,%20saya%20ingin%20mengajukan%20penawaran%20sewa%20peralatan:%20${encodeURIComponent(itemTitle)}`;
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* Header */}
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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.25em', fontWeight: 600 }}>
              {language === 'id' ? 'Layanan Sewa Peralatan' : 'Equipment Rental Services'}
            </span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              {language === 'id' ? 'Sewa Peralatan Medis & Alat Uji Radiasi' : 'Medical Equipment & Testing Meter Rentals'}
            </h1>
            <p style={{ maxWidth: '750px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>
              {language === 'id' 
                ? 'Solusi fleksibel persewaan peralatan proteksi radiasi tersertifikasi, alat ukur BAPETEN, dan fasilitas cleanroom temporer untuk mendukung proyek rumah sakit Anda.'
                : 'Flexible certified radiation testing meter and temporary cleanroom equipment leasing solutions to support your healthcare project operations.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rentals List Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {rentalItems.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                className="glass-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--glass-border)',
                  backgroundColor: 'var(--bg-primary)'
                }}
              >
                <div style={{ height: '220px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
                  <ImageSlider
                    images={item.images || [item.image]}
                    alt={item.title}
                    height="220px"
                  />
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    backgroundColor: 'rgba(14, 165, 233, 0.9)', color: '#FFF',
                    fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.8rem',
                    borderRadius: '20px', backdropFilter: 'blur(4px)', zIndex: 10
                  }}>
                    {item.category}
                  </span>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Manrope', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    
                    <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-medical-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <ShieldCheck size={16} /> {item.specs}
                      </span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={15} color="var(--color-cyan)" /> {item.terms}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#16A34A', fontWeight: 600 }}>
                        <CheckCircle2 size={15} /> {item.availability}
                      </span>
                    </div>

                    <a
                      href={createWhatsAppRentalInquiry(item.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.5rem', padding: '0.85rem', borderRadius: '8px', textDecoration: 'none',
                        fontWeight: 600, fontSize: '0.9rem'
                      }}
                    >
                      <MessageSquare size={18} /> {language === 'id' ? 'Tanya Sewa via WhatsApp' : 'Inquire Rental via WhatsApp'}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
