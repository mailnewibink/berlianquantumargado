import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wrench, Package, Key, PhoneCall } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();

  // Hide bottom nav on admin panel pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { label: language === 'id' ? 'Beranda' : 'Home', path: '/', icon: <Home size={20} /> },
    { label: language === 'id' ? 'Jasa' : 'Services', path: '/services', icon: <Wrench size={20} /> },
    { label: language === 'id' ? 'Produk' : 'Products', path: '/products', icon: <Package size={20} /> },
    { label: language === 'id' ? 'Sewa' : 'Rentals', path: '/rentals', icon: <Key size={20} /> },
    { label: language === 'id' ? 'Kontak' : 'Contact', path: '/contact', icon: <PhoneCall size={20} /> },
  ];

  return (
    <>
      <div className="mobile-bottom-bar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-bottom-item ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-bottom-icon">{item.icon}</div>
              <span className="mobile-bottom-label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <style>{`
        .mobile-bottom-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 64px;
          background: var(--bg-primary);
          border-top: 1px solid var(--glass-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 9990;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
          justify-content: space-around;
          align-items: center;
        }

        .mobile-bottom-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: var(--text-muted);
          gap: 3px;
          flex: 1;
          height: 100%;
          transition: color 0.2s ease, transform 0.15s ease;
        }

        .mobile-bottom-item.active {
          color: var(--color-medical-blue);
          font-weight: 700;
        }

        .mobile-bottom-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-bottom-label {
          font-size: 0.725rem;
          font-family: 'Manrope', sans-serif;
        }

        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: flex !important;
          }
          body {
            padding-bottom: 64px !important;
          }
        }
      `}</style>
    </>
  );
};
