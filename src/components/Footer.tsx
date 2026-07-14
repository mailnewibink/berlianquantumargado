import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        color: 'var(--text-primary)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Column 1: Company Profile Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-medical-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1rem', fontFamily: 'Manrope' }}>B</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  BERLIAN QUANTUM
                </span>
                <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '0.65rem', color: 'var(--color-cyan)', letterSpacing: '0.15em' }}>
                  ARGADO
                </span>
              </div>
            </Link>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Pioneering safe medical installations across Indonesia. We construct, engineer, and shield radiation-sensitive spaces to ensure patient and clinician safety.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-medical-blue)', fontWeight: 600 }}>
              <ShieldCheck size={18} />
              <span>Certified Radiation Protection Experts</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontFamily: 'Manrope', fontSize: '1.1rem', fontWeight: 700 }}>Quick Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <Link to="/about" style={footerLinkStyle}>About Our Company</Link>
              <Link to="/services" style={footerLinkStyle}>Engineering Services</Link>
              <Link to="/products" style={footerLinkStyle} >Equipment Catalog</Link>
              <Link to="/projects" style={footerLinkStyle}>Completed Facilities</Link>
              <Link to="/gallery" style={footerLinkStyle}>Pinterest Gallery</Link>
              <Link to="/contact" style={footerLinkStyle}>Submit Inquiry</Link>
            </div>
          </div>

          {/* Column 3: Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontFamily: 'Manrope', fontSize: '1.1rem', fontWeight: 700 }}>Contact Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ color: 'var(--color-medical-blue)', flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Quantum Tower, Suite 402B<br />
                  Jl. Boulevard Barat Raya No. 18<br />
                  Jakarta Utara, DKI Jakarta, Indonesia
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-medical-blue)' }} />
                <span>+62 21 829 4020</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--color-medical-blue)' }} />
                <span>info@berlianquantum.co.id</span>
              </div>
            </div>
          </div>

          {/* Column 4: Operational timings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontFamily: 'Manrope', fontSize: '1.1rem', fontWeight: 700 }}>Working Hours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Clock size={20} style={{ color: 'var(--color-cyan)', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Monday - Friday</p>
                  <p style={{ fontSize: '0.85rem' }}>08:00 AM - 05:00 PM (WIB)</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Clock size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Saturday</p>
                  <p style={{ fontSize: '0.85rem' }}>08:00 AM - 01:00 PM (Emergency Call Only)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div
          style={{
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
          className="footer-bottom"
        >
          <p>© {currentYear} PT Berlian Quantum Argado. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms of Service</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Radiation Safety Disclaimers</a>
          </div>
        </div>
      </div>
      
      <style>{`
        .footer-bottom {
          flex-direction: row;
        }
        @media (max-width: 576px) {
          .footer-bottom {
            flex-direction: column !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

const footerLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'var(--text-secondary)',
  transition: 'color var(--transition-fast)',
};
