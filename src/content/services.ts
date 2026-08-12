import type { ServiceItem } from '../types/content';

export const serviceItems: ServiceItem[] = [
  {
    id: 'radiation',
    imageKey: 'radiationShielding',
    iconKey: 'shield',
    title: 'Radiation Protection & Shielding',
    description:
      'Absolute containment engineering for X-Ray, CT Scan, Cath Lab, and radiotherapy environments.',
    details: [
      'High-density lead sheet lining (1.0mm - 4.0mm+ Pb equivalent)',
      'Automated and manual lead-shielded sliding/swing doors',
      'Radiation-protective double-glazed lead glass viewports',
      'BAPETEN licensing consultation and official safety certification support',
    ],
  },
  {
    id: 'construction',
    imageKey: 'hospitalConstruction',
    iconKey: 'hammer',
    title: 'Specialized Hospital Construction',
    description:
      'Design-build clinical spaces that conform with infection control, acoustics, and structural support demands.',
    details: [
      'Turnkey radiology suite and diagnostic department construction',
      'Sterile zones, Hybrid Operating Theaters and ICU facilities',
      'RF Shielding installation for Magnetic Resonance Imaging (MRI) rooms',
      'Anti-static vinyl floor leveling and antimicrobial wall paneling',
    ],
  },
  {
    id: 'hvac',
    imageKey: 'heroBackground',
    iconKey: 'activity',
    title: 'HVAC & Cleanroom Engineering',
    description: 'Creating sterile atmospheres via advanced laminar flow air-handling systems.',
    details: [
      'Laminar airflow ceilings and HEPA/ULPA filtration grids',
      'Positive and negative pressure isolation room installations',
      'Dynamic air change rate (ACH) and temperature/humidity control',
      'Particle count validation and filter leak scanning',
    ],
  },
  {
    id: 'furniture',
    imageKey: 'scrubSink',
    iconKey: 'sofa',
    title: 'Clinical Medical Furniture',
    description:
      'Fabrication of anti-bacterial laboratory furniture and specialized surgical preparation products.',
    details: [
      'Automatic sensor-activated medical scrub sinks (1-bay, 2-bay, 3-bay)',
      'High-grade SUS 304 stainless steel cabinets and instrument tables',
      'Cleanroom dynamic pass boxes with electronic interlocking doors',
      'Anti-bacterial workstation countertops and clinical cabinet systems',
    ],
  },
  {
    id: 'installation',
    imageKey: 'medicalEquipment',
    iconKey: 'settings',
    title: 'Medical Equipment Installation',
    description:
      'Rigging, anchoring, and commissioning support for heavy diagnostics infrastructure.',
    details: [
      'Heavy ceiling-pendant structural suspension frames',
      'Equipment mounting plates, base anchors, and safety guide rails',
      'Clinical-grade electrical distribution networks and UPS systems',
      'Medical gas piping networks (Oxygen, Vacuum, Nitrous Oxide)',
    ],
  },
  {
    id: 'maintenance',
    imageKey: 'passBox',
    iconKey: 'checkCircle',
    title: 'System Maintenance & Safety Audits',
    description:
      'Ensuring long-term structural and environmental parameters are maintained over time.',
    details: [
      'Routine radiation leakage testing and shielding integrity audits',
      'HEPA filter replacement, air flow profiling, and certification',
      'Emergency repair services for shielded automated doors',
      'Preventive compliance inspection reports for regulatory audits',
    ],
  },
];
