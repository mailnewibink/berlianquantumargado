import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown, Search } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'services' | 'products' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setSearchOpen(false);
  }, [location]);



  const servicesLinks = [
    { title: "Radiation Protection", path: "/services#radiation", desc: "Lead shielding design, engineering & regulatory licensing" },
    { title: "Hospital Construction", path: "/services#construction", desc: "Radiology rooms, CT scans, Cath labs & Dental rooms" },
    { title: "HVAC Systems", path: "/services#hvac", desc: "Laminar air flow, cleanroom filtration & custom ventilation" },
    { title: "Medical Furniture", path: "/services#furniture", desc: "Anti-bacterial tables, cabinets, and clinical workspace sets" },
    { title: "Equipment Installation", path: "/services#installation", desc: "Mechanical, electrical and equipment commissioning" },
    { title: "System Maintenance", path: "/services#maintenance", desc: "Radiation leak checks, validation & preventative audits" }
  ];

  const productsLinks = [
    { title: "Lead Shields & Glass", path: "/products?cat=Lead%20Sheet", desc: "High density lead sheeting & structural lead glass windows" },
    { title: "Lead Shielded Doors", path: "/products?cat=Lead%20Door", desc: "Manual, sliding, and automated safety radiation doors" },
    { title: "Cleanroom Equipment", path: "/products?cat=Pass%20Box", desc: "Dynamic pass boxes, scrub sinks & laminar flow hoods" },
    { title: "Hospital Finishes", path: "/products?cat=Vinyl%20Flooring", desc: "Anti-static vinyl flooring, wall guards & handrails" },
    { title: "Lighting & Power Systems", path: "/products?cat=Lighting", desc: "Surgical lighting, cleanroom lights, UPS and electrical safety" },
    { title: "Laboratory Furniture", path: "/products?cat=Laboratory%20Furniture", desc: "Fume hoods, clean benches & stainless cabinets" }
  ];

  return (
    <nav
      className={`glass-panel`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        transition: 'all var(--transition-normal)',
        backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-soft)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Corporate Logo */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-medical-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)',
            }}
          >
            <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1.2rem', fontFamily: 'Manrope' }}>B</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'Manrope',
                fontWeight: 800,
                fontSize: '1.15rem',
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              BERLIAN QUANTUM
            </span>
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--color-cyan)',
              }}
            >
              ARGADO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.25rem',
          }}
          className="desktop-nav"
        >
          <Link to="/" className="nav-link" style={navLinkStyle(location.pathname === "/")}>Home</Link>
          <Link to="/about" className="nav-link" style={navLinkStyle(location.pathname === "/about")}>About</Link>
          
          {/* Services Mega Menu Trigger */}
          <div
            style={{
              position: 'relative',
              paddingBottom: '20px',
              marginBottom: '-20px',
            }}
            onMouseEnter={() => setActiveMegaMenu('services')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link
              to="/services"
              className="nav-link"
              style={{
                ...navLinkStyle(location.pathname.startsWith("/services")),
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
               
              }}
            >
              Services <ChevronDown size={14} style={{ transform: activeMegaMenu === 'services' ? 'rotate(180deg)' : 'rotate(0)' }} />
              </Link>

            {/* Mega Menu Services Dropdown */}
            <div
              className="glass-card"
              style={{
                ...megaMenuStyle,
                opacity: activeMegaMenu === "services" ? 1 : 0,
                visibility: activeMegaMenu === "services" ? "visible" : "hidden",
                pointerEvents: activeMegaMenu === "services" ? "auto" : "none",
                transform:
                  activeMegaMenu === "services"
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-10px)",
                transition: "all .25s ease",
              }}
            >
          </div>

          {/* Products Mega Menu Trigger */}
          <div
            style={{
              position: 'relative',
              paddingBottom: '20px',
              marginBottom: '-20px',
            }}
            onMouseEnter={() => setActiveMegaMenu('products')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
<Link to="/products"
              className="nav-link"
              style={{
                ...navLinkStyle(location.pathname.startsWith("/products")),
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Products <ChevronDown size={14} style={{ transform: activeMegaMenu === 'products' ? 'rotate(180deg)' : 'rotate(0)' }} />
              </Link>

            {/* Mega Menu Products Dropdown */}
            <div
              className="glass-card"
              style={{
                ...megaMenuStyle,
                opacity: activeMegaMenu === "products" ? 1 : 0,
                visibility: activeMegaMenu === "products" ? "visible" : "hidden",
                pointerEvents: activeMegaMenu === "products" ? "auto" : "none",
                transform:
                  activeMegaMenu === "products"
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-10px)",
                transition: "all .25s ease",
              }}
            >
          </div>

          <Link to="/projects" className="nav-link" style={navLinkStyle(location.pathname === "/projects")}>Projects</Link>
          <Link to="/gallery" className="nav-link" style={navLinkStyle(location.pathname === "/gallery")}>Gallery</Link>
          <Link to="/contact" className="nav-link" style={navLinkStyle(location.pathname === "/contact")}>Contact</Link>
        </div>

        {/* Global Toolbar Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Search size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Hamburger Mobile Menu Trigger */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'none', // Overwritten by CSS styles
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Global Search Bar Overlay */}
      {searchOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            padding: '1.25rem 2rem',
            borderTop: 'none',
            display: 'flex',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-medium)',
            animation: 'fadeInDown 0.3s ease',
          }}
        >
          <div style={{ width: '100%', maxWidth: '800px', display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search services, hospital products, shielding specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '0.85rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--glass-border)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontFamily: 'Inter',
                outline: 'none',
              }}
            />
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem' }}
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 80px)',
            padding: '2rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            overflowY: 'auto',
            borderTop: 'none',
          }}
        >
          <Link to="/" className="mobile-link" style={mobileLinkStyle}>Home</Link>
          <Link to="/about" className="mobile-link" style={mobileLinkStyle}>About</Link>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-medical-blue)' }}>Services</span>
            <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {servicesLinks.map((item, idx) => (
                <Link key={idx} to={item.path} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.title}</Link>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-cyan)' }}>Products</span>
            <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {productsLinks.map((item, idx) => (
                <Link key={idx} to={item.path} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.title}</Link>
              ))}
            </div>
          </div>

          <Link to="/projects" className="mobile-link" style={mobileLinkStyle}>Projects</Link>
          <Link to="/gallery" className="mobile-link" style={mobileLinkStyle}>Gallery</Link>
          <Link to="/contact" className="mobile-link" style={mobileLinkStyle}>Contact</Link>
        </div>
      )}

      {/* Injecting CSS specifically for responsiveness of navbar */}
      <style>{`
        .nav-link {
          text-decoration: none;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          transition: color var(--transition-fast);
        }
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

const navLinkStyle = (active: boolean) => ({
  color: active ? 'var(--color-medical-blue)' : 'var(--text-primary)',
});

const mobileLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  fontFamily: 'Manrope',
  fontWeight: 700,
  fontSize: '1.25rem',
  color: 'var(--text-primary)',
};

const megaMenuStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% - 2px)',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '1.5rem',
  display: 'block',
  zIndex: 9999,
};

const megaMenuItemStyle: React.CSSProperties = {
  textDecoration: 'none',
  padding: '1rem',
  borderRadius: '12px',
  border: '1px solid transparent',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all var(--transition-fast)',
};
