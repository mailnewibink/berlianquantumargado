import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Target, Compass, Milestone, Users, FileText } from 'lucide-react';
import { InteractiveCard } from '../components/InteractiveCard';

export const About: React.FC = () => {
  const coreValues = [
    {
      icon: <Shield size={24} style={{ color: 'var(--color-medical-blue)' }} />,
      title: "Uncompromising Safety",
      desc: "In healthcare engineering, safety is not variable. We adhere strictly to absolute physical shielding thresholds and clinical sterility standards."
    },
    {
      icon: <Target size={24} style={{ color: 'var(--color-cyan)' }} />,
      title: "Precision Execution",
      desc: "Aligning lead sheeting, negative pressure containment, and equipment anchorage to the millimeter."
    },
    {
      icon: <Compass size={24} style={{ color: 'var(--color-medical-blue)' }} />,
      title: "Regulatory Compliance",
      desc: "Proactive partnerships with licensing bodies like BAPETEN and MOH to guarantee instant licensing approval."
    },
    {
      icon: <Milestone size={24} style={{ color: 'var(--color-cyan)' }} />,
      title: "Engineering Innovation",
      desc: "Integrating advanced modular systems and smart panel technology to control clinical environments dynamically."
    }
  ];

  const timelineSteps = [
    {
      year: "2016",
      title: "Company Founded",
      desc: "PT Berlian Quantum Argado established in Jakarta, catering to medical electrical works and local shielding shielding requests."
    },
    {
      year: "2019",
      title: "BAPETEN Licencing Integration",
      desc: "Became a certified partner for importing, designing, and constructing official nuclear medical facility installations across Indonesia."
    },
    {
      year: "2022",
      title: "Modular cleanroom development",
      desc: "Launched our specialized HVAC division, constructing Class 100/10,000 modular operating theaters and dynamic pressure isolation rooms."
    },
    {
      year: "2025",
      title: "Nationwide Expansion",
      desc: "Reached a milestone of 100+ successfully certified clinical facilities constructed across 18 Indonesian provinces."
    }
  ];

  const team = [
    {
      name: "Ir. Quantum Argado, M.T.",
      role: "Founder & Chief Executive Officer",
      bio: "Over 18 years of clinical infrastructure planning and safety engineering leadership."
    },
    {
      name: "Dr. Eng. Berlian R.S., PPR",
      role: "Lead Radiation Protection Officer",
      bio: "Ph.D. in Nuclear Engineering. Certified BAPETEN Radiation Protection Officer."
    },
    {
      name: "Sarah Amanda, M.Sc.",
      role: "Head of Cleanroom & HVAC Engineering",
      bio: "Specialist in laminar flow ventilation and hospital sterile boundary designs."
    }
  ];

  const certificates = [
    { title: "BAPETEN Radiation Licensing Partner", authority: "Badan Pengawas Tenaga Nuklir" },
    { title: "ISO 9001:2015 Quality Management", authority: "International Standards Organization" },
    { title: "ISO 13485:2016 Medical Devices Quality", authority: "Infrastructure & Equipment Installation" },
    { title: "MOH Authorized Constructor License", authority: "Kementerian Kesehatan RI" }
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
              About Our Company
            </h1>
            <p style={{ maxWidth: '700px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>
              We build the protective envelopes and mechanical networks that shield medical professionals and patients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{ fontSize: '2rem', fontFamily: 'Manrope', fontWeight: 800, marginBottom: '1.5rem' }}>
                Engineering Trust in Healthcare
              </h2>
              <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                At PT Berlian Quantum Argado, we recognize that building a hospital radiology suite or operating theatre requires a unique fusion of heavy construction physics and hyper-clean microbiological parameters. Standard construction techniques are simply inadequate when handling ionizing radiation or airborne contagions.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Our corporate history is built upon specialized nuclear engineering disciplines. Over the years, we have scaled our services to deliver full-scale medical architectural layouts, shielding sheet supplies, dynamic HVAC installations, and turnkey commissioning. We serve as the vital bridge between advanced diagnostic technology and architectural structural readiness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}
            >
              {/* Vision Card */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'var(--bg-tertiary)', color: 'var(--color-medical-blue)' }}>
                  <Eye size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, marginBottom: '0.5rem' }}>Our Vision</h3>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>
                    To be the premier clinical engineering and radiation protection reference standard in Southeast Asia, known for absolute safety, technical integrity, and reliable turnkey installations.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'rgba(6, 182, 212, 0.08)', color: 'var(--color-cyan)' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, marginBottom: '0.5rem' }}>Our Mission</h3>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>
                    To construct clinical spaces that conform perfectly with international safety codes, ensuring medical personnel operate in shielded, sterile environment blocks, and to secure rapid, headache-free regulatory licensing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.2em', fontWeight: 600 }}>
              Principles
            </span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Our Core Values
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {coreValues.map((value, idx) => (
              <InteractiveCard key={idx} delay={idx * 0.1} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ color: 'var(--color-medical-blue)' }}>{value.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'Manrope', fontWeight: 700 }}>{value.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>{value.desc}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 600 }}>
              Chronology
            </span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Our Milestone Journey
            </h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            {/* Timeline center line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '20px',
                width: '2px',
                backgroundColor: 'var(--glass-border)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {timelineSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
                  {/* Timeline circle node */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-primary)',
                      border: '3px solid var(--color-medical-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      fontSize: '0.8rem',
                      fontWeight: 850,
                      color: 'var(--color-medical-blue)',
                      flexShrink: 0,
                      boxShadow: 'var(--shadow-soft)',
                    }}
                  >
                    {step.year}
                  </div>

                  <div className="glass-card" style={{ flex: 1, padding: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, marginBottom: '0.5rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.2em', fontWeight: 600 }}>
              Leadership
            </span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Professional Engineering Officers
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {team.map((member, idx) => (
              <InteractiveCard key={idx} delay={idx * 0.15} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-medical-blue)',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Users size={36} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700 }}>{member.name}</h3>
                <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', fontWeight: 600, letterSpacing: '0.1em', marginTop: '-0.5rem' }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>{member.bio}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 600 }}>
              Credentials
            </span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Corporate Certificates & Licenses
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '1px solid var(--glass-border)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <div style={{ color: 'var(--color-medical-blue)' }}>
                  <FileText size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontFamily: 'Manrope', fontWeight: 700, marginBottom: '0.25rem' }}>{cert.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{cert.authority}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
