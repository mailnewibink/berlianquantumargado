import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Target, Compass, Milestone, Users, FileText } from 'lucide-react';
import { InteractiveCard } from '../components/InteractiveCard';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const coreValues = [
    {
      icon: <Shield size={24} style={{ color: 'var(--color-medical-blue)' }} />,
      title: t('aboutPage.values.0.title'),
      desc: t('aboutPage.values.0.desc')
    },
    {
      icon: <Target size={24} style={{ color: 'var(--color-cyan)' }} />,
      title: t('aboutPage.values.1.title'),
      desc: t('aboutPage.values.1.desc')
    },
    {
      icon: <Compass size={24} style={{ color: 'var(--color-medical-blue)' }} />,
      title: t('aboutPage.values.2.title'),
      desc: t('aboutPage.values.2.desc')
    },
    {
      icon: <Milestone size={24} style={{ color: 'var(--color-cyan)' }} />,
      title: t('aboutPage.values.3.title'),
      desc: t('aboutPage.values.3.desc')
    }
  ];

  const timelineSteps = [
    {
      year: t('aboutPage.timeline.0.year'),
      title: t('aboutPage.timeline.0.title'),
      desc: t('aboutPage.timeline.0.desc')
    },
    {
      year: t('aboutPage.timeline.1.year'),
      title: t('aboutPage.timeline.1.title'),
      desc: t('aboutPage.timeline.1.desc')
    },
    {
      year: t('aboutPage.timeline.2.year'),
      title: t('aboutPage.timeline.2.title'),
      desc: t('aboutPage.timeline.2.desc')
    },
    {
      year: t('aboutPage.timeline.3.year'),
      title: t('aboutPage.timeline.3.title'),
      desc: t('aboutPage.timeline.3.desc')
    }
  ];

  const team = [
    {
      name: t('aboutPage.team.0.name'),
      role: t('aboutPage.team.0.role'),
      bio: t('aboutPage.team.0.bio')
    },
    {
      name: t('aboutPage.team.1.name'),
      role: t('aboutPage.team.1.role'),
      bio: t('aboutPage.team.1.bio')
    },
    {
      name: t('aboutPage.team.2.name'),
      role: t('aboutPage.team.2.role'),
      bio: t('aboutPage.team.2.bio')
    }
  ];

  const certificates = [
    { title: t('aboutPage.certs.0.title'), authority: t('aboutPage.certs.0.authority') },
    { title: t('aboutPage.certs.1.title'), authority: t('aboutPage.certs.1.authority') },
    { title: t('aboutPage.certs.2.title'), authority: t('aboutPage.certs.2.authority') },
    { title: t('aboutPage.certs.3.title'), authority: t('aboutPage.certs.3.authority') }
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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.25em', fontWeight: 600 }}>{t('about.tag')}</span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('about.heading')}</h1>
            <p style={{ maxWidth: '700px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>{t('about.desc1')}</p>
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
              <h2 style={{ fontSize: '2rem', fontFamily: 'Manrope', fontWeight: 800, marginBottom: '1.5rem' }}>{t('about.heading')}</h2>
              <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.7' }}>{t('about.desc1')}</p>
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
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, marginBottom: '0.5rem' }}>{t('about.visionTitle')}</h3>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>{t('about.visionDesc')}</p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'rgba(6, 182, 212, 0.08)', color: 'var(--color-cyan)' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, marginBottom: '0.5rem' }}>{t('about.missionTitle')}</h3>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>{t('about.missionDesc')}</p>
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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.2em', fontWeight: 600 }}>{t('about.principlesTag')}</span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('about.principlesHeading')}</h2>
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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 600 }}>{t('about.chronologyTag')}</span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('about.chronologyHeading')}</h2>
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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.2em', fontWeight: 600 }}>{t('about.leadershipTag')}</span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('about.leadershipHeading')}</h2>
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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 600 }}>{t('about.credentialsTag')}</span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('about.credentialsHeading')}</h2>
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
