import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Hammer, Activity, Sofa, Settings, CheckCircle } from 'lucide-react';


export const Services: React.FC = () => {
  const serviceItems = [
    {
      id: "radiation",
      image: "/images/radiation_shielding.png",
      icon: <Shield size={28} />,
      title: "Radiation Protection & Shielding",
      desc: "Absolute containment engineering for X-Ray, CT Scan, Cath Lab, and radiotherapy environments.",
      details: [
        "High-density lead sheet lining (1.0mm - 4.0mm+ Pb equivalent)",
        "Automated and manual lead-shielded sliding/swing doors",
        "Radiation-protective double-glazed lead glass viewports",
        "BAPETEN licensing consultation and official safety certification support"
      ]
    },
    {
      id: "construction",
      image: "/images/hospital_construction.png",
      icon: <Hammer size={28} />,
      title: "Specialized Hospital Construction",
      desc: "Design-build clinical spaces that conform with infection control, acoustics, and structural support demands.",
      details: [
        "Turnkey radiology suite and diagnostic department construction",
        "Sterile zones, Hybrid Operating Theaters and ICU facilities",
        "RF Shielding installation for Magnetic Resonance Imaging (MRI) rooms",
        "Anti-static vinyl floor leveling and antimicrobial wall paneling"
      ]
    },
    {
      id: "hvac",
      image: "/images/hero_background.png", // Reusing high-quality asset
      icon: <Activity size={28} />,
      title: "HVAC & Cleanroom Engineering",
      desc: "Creating sterile atmospheres via advanced laminar flow air-handling systems.",
      details: [
        "Laminar airflow ceilings and HEPA/ULPA filtration grids",
        "Positive and negative pressure isolation room installations",
        "Dynamic air change rate (ACH) and temperature/humidity control",
        "Particle count validation and filter leak scanning"
      ]
    },
    {
      id: "furniture",
      image: "/images/scrub_sink.png", // Premium generated scrub sink asset
      icon: <Sofa size={28} />,
      title: "Clinical Medical Furniture",
      desc: "Fabrication of anti-bacterial laboratory furniture and specialized surgical preparation products.",
      details: [
        "Automatic sensor-activated medical scrub sinks (1-bay, 2-bay, 3-bay)",
        "High-grade SUS 304 stainless steel cabinets and instrument tables",
        "Cleanroom dynamic pass boxes with electronic interlocking doors",
        "Anti-bacterial workstation countertops and clinical cabinet systems"
      ]
    },
    {
      id: "installation",
      image: "/images/medical_equipment.png",
      icon: <Settings size={28} />,
      title: "Medical Equipment Installation",
      desc: "Rigging, anchoring, and commissioning support for heavy diagnostics infrastructure.",
      details: [
        "Heavy ceiling-pendant structural suspension frames",
        "Equipment mounting plates, base anchors, and safety guide rails",
        "Clinical-grade electrical distribution networks and UPS systems",
        "Medical gas piping networks (Oxygen, Vacuum, Nitrous Oxide)"
      ]
    },
    {
      id: "maintenance",
      image: "/images/pass_box.png", // Reusing dynamic pass box asset
      icon: <CheckCircle size={28} />,
      title: "System Maintenance & Safety Audits",
      desc: "Ensuring long-term structural and environmental parameters are maintained over time.",
      details: [
        "Routine radiation leakage testing and shielding integrity audits",
        "HEPA filter replacement, air flow profiling, and certification",
        "Emergency repair services for shielded automated doors",
        "Preventive compliance inspection reports for regulatory audits"
      ]
    }
  ];

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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.25em', fontWeight: 600 }}>
              PT Berlian Quantum Argado
            </span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Engineering & Construction Services
            </h1>
            <p style={{ maxWidth: '750px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>
              We deliver complete turnkey services from initial safety design to regulatory licensing approval for advanced medical spaces across Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-padding">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {serviceItems.map((item, idx) => (
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
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'cover',
                    borderRadius: '24px',
                    boxShadow: 'var(--shadow-medium)',
                    border: '1px solid var(--glass-border)',
                  }}
                />
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
                  {item.details.map((bullet, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle size={18} style={{ color: 'var(--color-cyan)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
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
          <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginBottom: '1.5rem' }}>
            Built to Rigorous Safety Standards
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto 3rem auto', color: 'var(--text-secondary)' }}>
            We guarantee 100% compliance with BAPETEN safety guidelines, Kementerian Kesehatan (MOH) standards, and international medical safety credentials.
          </p>
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
