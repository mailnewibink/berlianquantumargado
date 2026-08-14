import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Activity, Hammer, Settings, Sofa, CheckCircle2, Users, Globe, ChevronDown } from 'lucide-react';
import { InteractiveCard } from '../components/InteractiveCard';
import { useLanguage } from '../contexts/LanguageContext';

// Animated Counter Sub-component
const AnimatedCounter: React.FC<{ value: number; suffix?: string; label: string }> = ({ value, suffix = "", label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 2000; // 2 seconds
    const incrementTime = Math.max(Math.floor(totalDuration / end), 20);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 80); // Speed up increments
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Manrope, sans-serif' }}>
      <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-medical-blue)', margin: 0 }}>
        {count}{suffix}
      </h2>
      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 550, marginTop: '0.25rem', letterSpacing: '0.05em' }}>
        {label}
      </p>
    </div>
  );
};

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const expertiseList = [
    {
      icon: <Shield size={32} className="text-blue" />,
      title: t('expertise.radiation.title'),
      desc: t('expertise.radiation.desc'),
      delay: 0.1
    },
    {
      icon: <Hammer size={32} className="text-cyan" />,
      title: t('expertise.construction.title'),
      desc: t('expertise.construction.desc'),
      delay: 0.2
    },
    {
      icon: <Settings size={32} className="text-blue" />,
      title: t('expertise.equipment.title'),
      desc: t('expertise.equipment.desc'),
      delay: 0.3
    },
    {
      icon: <Activity size={32} className="text-cyan" />,
      title: t('expertise.hvac.title'),
      desc: t('expertise.hvac.desc'),
      delay: 0.4
    },
    {
      icon: <Sofa size={32} className="text-blue" />,
      title: t('expertise.furniture.title'),
      desc: t('expertise.furniture.desc'),
      delay: 0.5
    },
    {
      icon: <CheckCircle2 size={32} className="text-cyan" />,
      title: t('expertise.engineering.title'),
      desc: t('expertise.engineering.desc'),
      delay: 0.6
    }
  ];

  const featuredProjects = language === 'id' ? [
      { image: "https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703401/ChatGPT_Image_Aug_14_2026_05_24_19_PM_hmaeih.png", title: "Instalasi & Pemasangan CT Scan", category: "Instalasi Medis", location: "Siloam Hospital, Jakarta" },
      { image: "https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703400/ChatGPT_Image_Aug_14_2026_05_26_11_PM_o1ilfz.png", title: "Instalasi & Pemasangan HandRail", category: "Konstruksi Rumah Sakit", location: "Rumah Sakit Harapan Kita, Jakarta" },
      { image: "https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703441/ChatGPT_Image_Aug_14_2026_05_30_03_PM_laph9m.png", title: "Pemasangan Hermetic Door with Foot Sensor Radiologi Anti Radiasi", category: "Pelindung Radiasi", location: "RSUD Dr. Soetomo, Surabaya" }
    ] : [
      { image: "https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703401/ChatGPT_Image_Aug_14_2026_05_24_19_PM_hmaeih.png", title: "CT Scan Installation & Setup", category: "Medical Installation", location: "Siloam Hospital, Jakarta" },
      { image: "https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703400/ChatGPT_Image_Aug_14_2026_05_26_11_PM_o1ilfz.png", title: "HandRail Installation & Mounting", category: "Hospital Construction", location: "Rumah Sakit Harapan Kita, Jakarta" },
      { image: "https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703441/ChatGPT_Image_Aug_14_2026_05_30_03_PM_laph9m.png", title: "Hermetic Door Installation with Foot Sensor Radiation Shielding", category: "Radiation Shielding", location: "RSUD Dr. Soetomo, Surabaya" }
    ];

  const chooseUsCards = language === 'id' ? [
      { icon: <Users size={36} style={{ color: 'var(--color-cyan)' }} />, title: "Tim Profesional", desc: "Dikelola oleh petugas proteksi radiasi (PPR) bersertifikat, spesialis mekanikal/elektrikal, dan perencana ruang klinis." },
      { icon: <Globe size={36} style={{ color: 'var(--color-medical-blue)' }} />, title: "Layanan Nasional", desc: "Implementasi proyek yang sukses di seluruh pulau-pulau besar di Indonesia, dari Sumatera hingga Papua." },
      { icon: <Activity size={36} style={{ color: 'var(--color-cyan)' }} />, title: "Keunggulan Rekayasa", desc: "Menggabungkan keselamatan struktural fisik dengan tata letak klinis yang mengoptimalkan alur kerja medis dan pengendalian infeksi." }
    ] : [
      { icon: <Users size={36} style={{ color: 'var(--color-cyan)' }} />, title: "Professional Team", desc: "Staffed by certified radiation protection officers (PPR), mechanical/electrical specialists, and clinical space planners." },
      { icon: <Globe size={36} style={{ color: 'var(--color-medical-blue)' }} />, title: "Nationwide Service", desc: "Successful project implementation across major islands of Indonesia, from Sumatra to Papua." },
      { icon: <Activity size={36} style={{ color: 'var(--color-cyan)' }} />, title: "Engineering Excellence", desc: "Combining physical structural safety with clinical layouts that optimize medical workflows and infection control." }
    ];

  const industries = language === 'id' ? [
      "Rumah Sakit (Tipe A & B)",
      "Klinik Medis Khusus",
      "Laboratorium Diagnostik",
      "Kementerian Kesehatan",
      "Pusat Medis Universitas",
      "Pusat Radiologi & Pencitraan"
    ] : [
      "Hospitals (Tipe A & B)",
      "Specialized Medical Clinics",
      "Diagnostic Laboratories",
      "Government Health Ministries",
      "University Medical Centers",
      "Radiology & Imaging Hubs"
    ];

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 1. Fullscreen Hero Section */}
      <section
        style={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#0F172A',
        }}
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703400/ChatGPT_Image_Aug_14_2026_05_26_11_PM_o1ilfz.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.45,
            y: heroY,
          }}
        />
        
        {/* Dark to soft blue cyan gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, color: '#FFFFFF' }}>
          <motion.div
            style={{ maxWidth: '800px', opacity: heroOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                color: 'var(--color-cyan)',
                letterSpacing: '0.25em',
                marginBottom: '1rem',
                display: 'inline-block',
              }}
            >
              PT Berlian Quantum Argado
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontFamily: 'Manrope',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: '#FFFFFF',
              }}
              dangerouslySetInnerHTML={{ __html: t('hero.title').replace('Safer', '<span style="color: var(--color-cyan)">Safer</span>').replace('Lebih Aman', '<span style="color: var(--color-cyan)">Lebih Aman</span>') }}
            />
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontFamily: 'Inter',
                lineHeight: 1.6,
                color: '#CBD5E1',
                marginBottom: '2.5rem',
                maxWidth: '650px',
              }}
            >
              {t('hero.subtitle')}
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-primary" style={{ fontSize: '1rem' }}>
                {t('hero.ctaServices')} <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary" style={{ fontSize: '1rem', color: '#FFFFFF', borderColor: '#FFFFFF' }}>
                {t('hero.ctaContact')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.8rem',
            fontFamily: 'Inter',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <span>{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={18} style={{ color: 'var(--color-cyan)' }} />
          </motion.div>
        </div>
      </section>

      {/* 2. About Brief Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703403/ChatGPT_Image_Aug_14_2026_05_21_33_PM_bctfgy.png"
                alt="Infrastruktur Berkinerja Tinggi"
                style={{
                  width: '100%',
                  borderRadius: '24px',
                  boxShadow: 'var(--shadow-medium)',
                  border: '1px solid var(--glass-border)',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.2em', fontWeight: 600 }}>
                {t('about.tag')}
              </span>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'Manrope', fontWeight: 800 }}>
                {t('about.heading')}
              </h2>
              <p>
                {t('about.desc1')}
              </p>
              <p>
                {t('about.desc2')}
              </p>
              <div>
                <Link to="/about" className="btn-secondary">
                  {t('about.btn')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Expertise Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 600 }}>
              {t('expertise.tag')}
            </span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              {t('expertise.heading')}
            </h2>
            <p style={{ maxWidth: '600px', margin: '1rem auto 0 auto', color: 'var(--text-secondary)' }}>
              {t('expertise.subheading')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {expertiseList.map((item, idx) => (
              <InteractiveCard key={idx} delay={item.delay} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    backgroundColor: idx % 2 === 0 ? 'var(--bg-tertiary)' : 'rgba(6, 182, 212, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: idx % 2 === 0 ? 'var(--color-medical-blue)' : 'var(--color-cyan)',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'Manrope', fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>{item.desc}</p>
                <Link
                  to={`/services`}
                  style={{
                    marginTop: 'auto',
                    fontSize: '0.875rem',
                    color: 'var(--color-medical-blue)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.2em', fontWeight: 600 }}>
                Operations
              </span>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{language === 'id' ? 'Proyek Unggulan' : 'Featured Projects'}</h2>
            </div>
            <Link to="/projects" className="btn-secondary" style={{ padding: '0.75rem 1.75rem' }}>
              View All Facilities
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="glass-card"
                style={{ overflow: 'hidden', padding: 0 }}
              >
                <div style={{ overflow: 'hidden', height: '260px', position: 'relative' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition-normal)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      padding: '0.4rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 600 }}>
              Trust Parameters
            </span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Why Choose PT Berlian Quantum Argado?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
            {chooseUsCards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '1.5rem',
                  borderLeft: '3px solid var(--color-medical-blue)',
                }}
              >
                <div style={{ marginBottom: '0.5rem' }}>{card.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'Manrope', fontWeight: 700 }}>{card.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Statistics Counter Section */}
      <section
        className="section-padding"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.05,
            backgroundImage: 'radial-gradient(#06B6D4 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            <AnimatedCounter value={120} suffix="+" label={t('stats.projects')} />
            <AnimatedCounter value={45} suffix="+" label={t('stats.clients')} />
            <AnimatedCounter value={10} suffix="+" label={t('stats.years')} />
            <AnimatedCounter value={18} suffix="+" label={t('stats.cities')} />
          </div>
        </div>
      </section>

      {/* 7. Industries Served Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 600 }}>
                {t('sectors.tag')}
              </span>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                {t('sectors.heading')}
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                {t('sectors.desc')}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {industries.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    textAlign: 'center',
                    borderRadius: '16px',
                    borderColor: 'var(--glass-border)',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Banner Section */}
      <section
        style={{
          padding: '6rem 0',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
          borderTop: '1px solid var(--glass-border)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
          >
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Manrope', fontWeight: 800, maxWidth: '750px', lineHeight: '1.3' }}>
              {t('ctaBanner.heading')}
            </h2>
            <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              {t('ctaBanner.desc')}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
                {t('ctaBanner.btnConsult')}
              </Link>
              <Link to="/products" className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>
                {t('ctaBanner.btnBrowse')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
