import type { ImageKey } from '../content/assets';

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

/** Supported site languages. Matches `LanguageContext`. */
export type Language = 'en' | 'id';

/**
 * Lucide icon identifiers used across content data.
 * UI components map these keys to actual icon components.
 */
export type IconKey =
  | 'shield'
  | 'hammer'
  | 'activity'
  | 'sofa'
  | 'settings'
  | 'checkCircle'
  | 'checkCircle2'
  | 'award'
  | 'users'
  | 'globe'
  | 'eye'
  | 'target'
  | 'compass'
  | 'milestone'
  | 'fileText'
  | 'arrowRight'
  | 'chevronDown'
  | 'mapPin'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'messageSquare';

/** Reusable page-level SEO metadata. */
export interface PageMeta {
  title: string;
  description: string;
}

/** Standard page hero banner used on inner pages (Services, Gallery, etc.). */
export interface PageHeaderContent {
  tag: string;
  title: string;
  description: string;
}

/** Centered section heading block (tag + heading + optional subheading). */
export interface SectionHeaderContent {
  tag: string;
  heading: string;
  subheading?: string;
}

/** Simple navigation link. */
export interface NavLink {
  label: string;
  path: string;
}

/** Mega-menu navigation item with short description. */
export interface MegaMenuLink extends NavLink {
  description: string;
}

/** Footer link (may use placeholder href for unimplemented pages). */
export interface FooterLink {
  label: string;
  path: string;
}

// ---------------------------------------------------------------------------
// Company-wide shared content
// ---------------------------------------------------------------------------

export interface CompanyInfo {
  legalName: string;
  shortName: string;
  tagline: string;
}

export interface ContactAddress {
  lines: string[];
}

export interface ContactEmails {
  general: string;
  engineering: string;
}

export interface ContactPhones {
  phone: string;
  fax: string;
}

export interface BusinessHours {
  weekdays: { label: string; hours: string };
  saturday: { label: string; hours: string };
}

export interface ContactInfo {
  address: ContactAddress;
  phones: ContactPhones;
  emails: ContactEmails;
  hours: BusinessHours;
}

export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
  contactFormMessage: string;
}

export interface MapPlaceholder {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

/** Site-wide values reused across Footer, Contact, Navbar, etc. */
export interface CommonContent {
  company: CompanyInfo;
  contact: ContactInfo;
  whatsapp: WhatsAppConfig;
  map: MapPlaceholder;
  certificationBadge: string;
}

// ---------------------------------------------------------------------------
// Navigation & footer
// ---------------------------------------------------------------------------

export interface NavigationSearch {
  placeholder: string;
  buttonLabel: string;
}

export interface NavigationContent {
  home: string;
  about: string;
  services: string;
  products: string;
  projects: string;
  gallery: string;
  contact: string;
  quoteButton: string;
  specsButton: string;
  search: NavigationSearch;
  servicesMenu: MegaMenuLink[];
  productsMenu: MegaMenuLink[];
  footer: FooterContent;
}

export interface FooterContent {
  description: string;
  quickNavTitle: string;
  quickNavLinks: FooterLink[];
  contactTitle: string;
  hoursTitle: string;
  copyright: string;
  legalLinks: FooterLink[];
}

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

export interface HeroContent {
  tag: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaServices: string;
  ctaContact: string;
  scrollLabel: string;
}

export interface AboutBriefContent {
  tag: string;
  heading: string;
  paragraphs: string[];
  buttonLabel: string;
  imageKey: ImageKey;
}

export interface ExpertiseItem {
  iconKey: IconKey;
  title: string;
  description: string;
  linkPath: string;
  linkLabel: string;
  /** Stagger delay for scroll-reveal animation (seconds). */
  animationDelay: number;
}

export interface ExpertiseSectionContent {
  header: SectionHeaderContent;
  items: ExpertiseItem[];
}

export interface FeaturedProjectItem {
  imageKey: ImageKey;
  title: string;
  category: string;
  location: string;
}

export interface FeaturedProjectsSectionContent {
  tag: string;
  heading: string;
  viewAllLabel: string;
  viewAllPath: string;
  items: FeaturedProjectItem[];
}

export interface WhyChooseUsItem {
  iconKey: IconKey;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionContent {
  header: SectionHeaderContent;
  items: WhyChooseUsItem[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface IndustriesSectionContent {
  header: SectionHeaderContent;
  description: string;
  items: string[];
}

export interface CtaBannerContent {
  heading: string;
  description: string;
  primaryButton: NavLink;
  secondaryButton: NavLink;
}

export interface HomeContent {
  hero: HeroContent;
  aboutBrief: AboutBriefContent;
  expertise: ExpertiseSectionContent;
  featuredProjects: FeaturedProjectsSectionContent;
  whyChooseUs: WhyChooseUsSectionContent;
  stats: StatItem[];
  industries: IndustriesSectionContent;
  ctaBanner: CtaBannerContent;
}

// ---------------------------------------------------------------------------
// Services page
// ---------------------------------------------------------------------------

export interface ServiceItem {
  id: string;
  imageKey: ImageKey;
  iconKey: IconKey;
  title: string;
  description: string;
  details: string[];
}

export interface QualityStandardBadge {
  label: string;
  colorVariant: 'medicalBlue' | 'cyan';
}

export interface QualityStandardsContent {
  heading: string;
  description: string;
  badges: QualityStandardBadge[];
}

export interface ServicesContent {
  header: PageHeaderContent;
  items: ServiceItem[];
  qualityStandards: QualityStandardsContent;
}

// ---------------------------------------------------------------------------
// Gallery page
// ---------------------------------------------------------------------------

export interface GalleryItem {
  imageKey: ImageKey;
  title: string;
  category: string;
}

export interface GalleryContent {
  header: PageHeaderContent;
  items: GalleryItem[];
}

// ---------------------------------------------------------------------------
// Contact page
// ---------------------------------------------------------------------------

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactFormLabels {
  name: string;
  email: string;
  phone: string;
  hospital: string;
  projectFocus: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
}

export interface ContactFormSuccess {
  title: string;
  description: string;
  submitAnother: string;
}

export interface SpeedConsultationContent {
  title: string;
  description: string;
  buttonLabel: string;
}

export interface ContactContent {
  header: PageHeaderContent;
  officeHeading: string;
  officeDescription: string;
  contactLabels: {
    address: string;
    communications: string;
    emailContacts: string;
    operationalTiming: string;
  };
  speedConsultation: SpeedConsultationContent;
  formHeading: string;
  formLabels: ContactFormLabels;
  formOptions: ContactFormOption[];
  formSuccess: ContactFormSuccess;
  faqHeader: SectionHeaderContent;
  faqs: FaqItem[];
}

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export interface CoreValueItem {
  iconKey: IconKey;
  title: string;
  description: string;
}

export interface TimelineStep {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface CertificateItem {
  title: string;
  authority: string;
}

export interface VisionMissionContent {
  visionTitle: string;
  visionDescription: string;
  missionTitle: string;
  missionDescription: string;
}

export interface AboutContent {
  header: PageHeaderContent;
  narrativeHeading: string;
  narrativeParagraphs: string[];
  visionMission: VisionMissionContent;
  coreValues: {
    header: SectionHeaderContent;
    items: CoreValueItem[];
  };
  timeline: {
    header: SectionHeaderContent;
    steps: TimelineStep[];
  };
  team: {
    header: SectionHeaderContent;
    members: TeamMember[];
  };
  certificates: {
    header: SectionHeaderContent;
    items: CertificateItem[];
  };
}

// ---------------------------------------------------------------------------
// Products page
// ---------------------------------------------------------------------------

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  specs: string;
  description: string;
  imageKey: ImageKey;
}

export interface ProductsContent {
  header: PageHeaderContent;
  categories: string[];
  items: ProductItem[];
  emptyStateMessage: string;
  specsButtonLabel: string;
  quoteButtonLabel: string;
}

// ---------------------------------------------------------------------------
// Projects page
// ---------------------------------------------------------------------------

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  location: string;
  year: string;
  imageKey: ImageKey;
  details: string;
  scope: string[];
}

export interface ProjectsContent {
  header: PageHeaderContent;
  categories: string[];
  items: ProjectItem[];
}

// ---------------------------------------------------------------------------
// Site-wide content aggregate (for future `getContent(lang)`)
// ---------------------------------------------------------------------------

export interface SiteContent {
  language: Language;
  seo: {
    default: PageMeta;
    home: PageMeta;
    about: PageMeta;
    services: PageMeta;
    products: PageMeta;
    projects: PageMeta;
    gallery: PageMeta;
    contact: PageMeta;
  };
  common: CommonContent;
  navigation: NavigationContent;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  products: ProductsContent;
  projects: ProjectsContent;
  gallery: GalleryContent;
  contact: ContactContent;
}
