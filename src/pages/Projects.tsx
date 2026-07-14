import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, MapPin, Calendar, ClipboardList, Check } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  location: string;
  year: string;
  image: string;
  details: string;
  scope: string[];
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Hospital", "Dental", "Radiology", "Laboratory", "Government", "Commercial"];

  const projectsList: Project[] = [
    {
      id: "proj-1",
      title: "Advanced CT Scan & Cath Lab Shielding",
      client: "Siloam Hospitals Group",
      category: "Radiology",
      location: "Jakarta Barat, DKI Jakarta",
      year: "2024",
      image: "/images/radiation_shielding.png",
      details: "Full turnkey radiation shielding execution for Siloam's new state-of-the-art dual-source CT scanner room. Custom 3mm lead lining sheets and automated heavy lead doors were designed, installed, and validated.",
      scope: [
        "3.0mm Pb lead sheeting lining inside clinical drywall partitions",
        "Dual automated 3.0mm Pb sliding lead shielding doors",
        "Lead glass observation viewports (1200x800mm, 3.0mm Pb equivalent)",
        "BAPETEN leakage validation audits and nuclear license issuance"
      ]
    },
    {
      id: "proj-2",
      title: "Hybrid Cardiac Operating Theatre Layout",
      client: "RS Jantung Harapan Kita",
      category: "Hospital",
      location: "Jakarta Pusat, DKI Jakarta",
      year: "2025",
      image: "/images/hospital_construction.png",
      details: "Design-build contract for a sterile Hybrid Operating Room (Class 10,000 cleanroom status). Integrated heavy equipment suspension frameworks with advanced laminar flow systems.",
      scope: [
        "Laminar Air Flow (LAF) filter ceiling grids with HEPA filtration",
        "Surgical ceiling-pendant structural suspension frames",
        "Antibacterial seamless flooring and sanitizable wall surfaces",
        "Electrical isolation transformers and emergency UPS control nodes"
      ]
    },
    {
      id: "proj-3",
      title: "Cleanroom Diagnostic Lab Infrastructure",
      client: "Bio Farma Laboratories",
      category: "Laboratory",
      location: "Bandung, Jawa Barat",
      year: "2024",
      image: "/images/pass_box.png",
      details: "Constructed Class 1,000 containment environments for sensitive viral diagnostics and culture processing. Built pressure boundaries to maintain sterile clinical zones.",
      scope: [
        "Negative pressure containment boundaries and mechanical controls",
        "Dynamic cleanroom pass boxes with electronic interlock gates",
        "SUS 304 Stainless steel medical cabinetry and scrubbing stations",
        "Specialized chemical exhaust fume hoods and laboratory utility conduits"
      ]
    },
    {
      id: "proj-4",
      title: "Panoramic Dental X-Ray Clinic Protection",
      client: "Dentia Specialist Dental Center",
      category: "Dental",
      location: "Surabaya, Jawa Timur",
      year: "2023",
      image: "/images/medical_equipment.png",
      details: "Custom radiation protection lining and warning components for an upscale aesthetic dental imaging room.",
      scope: [
        "1.5mm Pb lead sheeting lining inside clinic drywall sheets",
        "Lead-shielded wooden core swing door (1.5mm Pb equivalent)",
        "Syncing Warning LED Indicators ('X-RAY ON') above entryway",
        "Handheld operator shielding partitions"
      ]
    },
    {
      id: "proj-5",
      title: "Provincial Isolation Facility Setup",
      client: "Kementerian Kesehatan (MOH RI)",
      category: "Government",
      location: "Medan, Sumatera Utara",
      year: "2023",
      image: "/images/hero_background.png",
      details: "Rapid design-build of emergency positive-pressure containment ward blocks, constructed under a government health development program.",
      scope: [
        "16 self-contained pressure-monitored clinical patient bays",
        "Centralized HEPA fresh air handling unit (AHU) installations",
        "Independent clinical-grade electrical backup grounding",
        "Medical oxygen pipeline gas distribution networks"
      ]
    },
    {
      id: "proj-6",
      title: "Pharma Sterile Distribution Chamber",
      client: "Kalbe Farma Manufacturing",
      category: "Commercial",
      location: "Cikarang, Jawa Barat",
      year: "2024",
      image: "/images/scrub_sink.png",
      details: "High-grade sterile packaging room layouts integrating electronic access controls and automatic scrubbing stations.",
      scope: [
        "Antibacterial wall panel blocks and seamless joint sealants",
        "Double-bay sensor-activated SUS 304 scrub sinks",
        "Laminar ceiling systems with air change validation monitors",
        "Integrated access locks matching strict GMP guidelines"
      ]
    }
  ];

  const filteredProjects = filter === 'All'
    ? projectsList
    : projectsList.filter(proj => proj.category === filter);

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
              PT Berlian Quantum Argado
            </span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>
              Our Completed Projects
            </h1>
            <p style={{ maxWidth: '750px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>
              Explore our record of safety-certified operating theaters, radiation bunkers, and diagnostic suites across Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Filter Navigation */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: '1.5rem',
              }}
            >
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: filter === cat ? 'var(--color-medical-blue)' : 'var(--glass-border)',
                    backgroundColor: filter === cat ? 'var(--color-medical-blue)' : 'transparent',
                    color: filter === cat ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layoutId={`project-${proj.id}`}
                  className="glass-card"
                  style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}
                  onClick={() => setSelectedProject(proj)}
                  whileHover={{ y: -6, boxShadow: 'var(--shadow-premium)' }}
                >
                  <div style={{ overflow: 'hidden', height: '240px' }}>
                    <img
                      src={proj.image}
                      alt={proj.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform var(--transition-normal)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        color: 'var(--color-cyan)',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {proj.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 800, margin: 0 }}>
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={14} /> {proj.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Project Detail Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(9, 13, 22, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100000,
              padding: '2rem',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '750px',
                padding: 0,
                backgroundColor: 'var(--bg-primary)',
                overflow: 'hidden',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header image panel */}
              <div style={{ height: '240px', position: 'relative' }}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {selectedProject.category}
                </div>
              </div>

              {/* Scrollable details panel */}
              <div style={{ padding: '2.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'Manrope', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                    {selectedProject.title}
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <MapPin size={14} /> {selectedProject.location}
                  </p>
                </div>

                {/* Client & Year details */}
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Client Name</span>
                    <span style={{ fontWeight: 650, fontSize: '0.95rem' }}>{selectedProject.client}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Commission Year</span>
                    <span style={{ fontWeight: 650, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} /> {selectedProject.year}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Info size={18} style={{ color: 'var(--color-medical-blue)' }} /> Project Overview
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                    {selectedProject.details}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ClipboardList size={18} style={{ color: 'var(--color-cyan)' }} /> Completed Scope of Work
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedProject.scope.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <Check size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-primary"
                    style={{ padding: '0.85rem 2rem', boxShadow: 'none' }}
                  >
                    Close Project Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
