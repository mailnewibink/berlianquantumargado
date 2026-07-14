import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Radiation Shielding',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      q: "What shielding thickness do standard diagnostic X-Ray and CT scan rooms require?",
      a: "Typically, general diagnostic radiology rooms require 1.5mm to 2.0mm Pb lead shielding equivalent. CT scan rooms usually require 2.0mm to 3.0mm Pb, depending on the scanner's kVp output, layout geometry, occupancy of adjacent rooms, and local BAPETEN structural requirements. We design and verify exact thickness parameters using formal radiation protection calculations."
    },
    {
      q: "Does PT Berlian Quantum Argado provide certification for nuclear licensing?",
      a: "Yes. We supply comprehensive radiation protection files, including lead shielding thickness reports, mechanical drawings, and PPR (Radiation Protection Officer) safety calculation stamps. This documentation is crucial to secure your license approvals from BAPETEN (Badan Pengawas Tenaga Nuklir) and Kementerian Kesehatan (MOH)."
    },
    {
      q: "What is the typical design-build timeline for a sterile Operating Room (Cleanroom)?",
      a: "A standard modular operating room cleanroom takes between 4 to 8 weeks. This timeline includes layout design, steel structure rigging, modular sandwich wall panels alignment, cleanroom ceiling grid placement, HEPA/HVAC duct connections, and full calibration audits (particle count, room pressure, air changes, velocity)."
    },
    {
      q: "Do you supply shielding sheets and installation teams outside of Java?",
      a: "Absolutely. We distribute raw materials (lead sheets, lead doors, lead glass) and mobilize specialized engineering installation crews to projects across all provinces of Indonesia, from Sumatra to Papua."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'Radiation Shielding',
        message: ''
      });
    }, 800);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const waLink = "https://wa.me/6281234567890?text=Hello%20PT%20Berlian%20Quantum%20Argado,%20I%20have%20submitted%20a%20contact%20form%20and%20would%20like%20to%20speed%20up%20our%20healthcare%20engineering%20consultation.";

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
              Connect With Us
            </span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Project Consultation & Contact
            </h1>
            <p style={{ maxWidth: '750px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>
              Have clinical projects or shielding inquiries? Reach out to our design office or consult directly with our PPR engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form and Contact Cards */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
            
            {/* Contact details Card List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'Manrope', fontWeight: 800 }}>Office Headquarters</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Consult with our engineering representatives at our corporate headquarters in Jakarta.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', color: 'var(--color-medical-blue)' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Address</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: '1.5' }}>
                      Quantum Tower, Suite 402B<br />
                      Jl. Boulevard Barat Raya No. 18<br />
                      Jakarta Utara, DKI Jakarta, 14240
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', color: 'var(--color-cyan)' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Communications</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Phone: +62 21 829 4020<br />
                      Fax: +62 21 829 4021
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', color: 'var(--color-medical-blue)' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Email Contacts</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      General: info@berlianquantum.co.id<br />
                      Engineering: design@berlianquantum.co.id
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', color: 'var(--color-cyan)' }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Operational Timing</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Monday - Friday: 08:00 AM - 05:00 PM<br />
                      Saturday: 08:00 AM - 01:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast WhatsApp redirect */}
              <div
                className="glass-card"
                style={{
                  padding: '2rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.05)',
                  border: '1px solid rgba(34, 197, 94, 0.15)',
                  marginTop: '1rem',
                }}
              >
                <h4 style={{ fontSize: '1.15rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MessageSquare size={22} /> Speed Consultation
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  Need an urgent price quote or have bidding requirements? Skip the email and talk directly with our lead planner.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    backgroundColor: '#22C55E',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
                  }}
                >
                  Direct WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'Manrope', fontWeight: 800, marginBottom: '1.5rem' }}>
                Inquiry Submission
              </h2>

              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      textAlign: 'center',
                      padding: '2rem 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <CheckCircle2 size={56} style={{ color: 'var(--color-success)' }} />
                    <h3 style={{ fontSize: '1.5rem', fontFamily: 'Manrope' }}>Form Submitted Successfully</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      Thank you for contacting PT Berlian Quantum Argado. An engineering representative will review your project parameters and respond within 24 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      style={{
                        padding: '0.5rem 1.5rem',
                        border: '1px solid var(--text-primary)',
                        borderRadius: 'var(--radius-full)',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        marginTop: '1rem',
                      }}
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Your Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Phone / WhatsApp</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Hospital / Institution</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Project Focus Area</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        style={inputStyle}
                      >
                        <option value="Radiation Shielding">Radiation Shielding (Lead lining)</option>
                        <option value="Hospital Construction">Hospital Construction (CT/operating theaters)</option>
                        <option value="HVAC Systems">HVAC & Cleanrooms (HEPA ventilation)</option>
                        <option value="Furniture Supply">Medical Furniture Supply</option>
                        <option value="Maintenance / Audit">Preventative Maintenance & Safety Audit</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Message & Technical Specs</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Detail your equipment models, room sizes, lead equivalents (mm Pb) or specific requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        style={{
                          ...inputStyle,
                          borderRadius: '16px',
                          resize: 'none',
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                      Submit Inquiry Sheet
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map Premium Placement Placeholder */}
      <section
        style={{
          height: '400px',
          borderTop: '1px solid var(--glass-border)',
          borderBottom: '1px solid var(--glass-border)',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.8,
          }}
        >
          <div
            className="glass-card"
            style={{
              padding: '1.5rem 2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-medium)',
              maxWidth: '450px',
            }}
          >
            <h4 style={{ fontFamily: 'Manrope', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-medical-blue)', marginBottom: '0.25rem' }}>
              Jakarta Office Location Map
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Interactive Google Map Loader. (Latitude: -6.151239, Longitude: 106.894102)
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.2em', fontWeight: 600 }}>
              FAQ
            </span>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--glass-border)',
                  backgroundColor: 'var(--bg-primary)',
                  cursor: 'pointer',
                  borderRadius: '16px',
                }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'Manrope', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    {faq.q}
                  </h3>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform var(--transition-fast)',
                      flexShrink: 0,
                    }}
                  />
                </div>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.6', margin: '1rem 0 0 0' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 576px) {
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1.25rem',
  borderRadius: 'var(--radius-full)',
  border: '1px solid var(--glass-border)',
  backgroundColor: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'Inter',
  fontSize: '0.9rem',
};
