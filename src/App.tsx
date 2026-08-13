import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';

// Page Components
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { Projects } from './pages/Projects';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Admin Components
import { AdminLayout } from './layouts/AdminLayout';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminAssets } from './pages/admin/Assets';
import { AdminProjects } from './pages/admin/Projects';
import { AdminProducts } from './pages/admin/Products';
import { AdminGallery } from './pages/admin/GalleryManager';
import { AdminServices } from './pages/admin/Services';
import { AdminRentals } from './pages/admin/Rentals';

// Scroll mitigation component on route change
const ScrollToTopOnRoute: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Route wrapper for clean page fade transitions
const AnimatedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      {children}
    </motion.div>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode, darkMode: boolean, toggleDarkMode: () => void }> = ({ children, darkMode, toggleDarkMode }) => (
  <>
    <LoadingScreen />
    <CursorGlow />
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <main style={{ minHeight: '80vh' }}>
      {children}
    </main>
    <Footer />
    <FloatingWhatsApp />
    <ScrollToTop />
  </>
);

const AppRoutes: React.FC<{ darkMode: boolean, toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="assets" element={<AdminAssets />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="rentals" element={<AdminRentals />} />
          <Route path="gallery" element={<AdminGallery />} />
        </Route>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRouteWrapper><Home /></AnimatedRouteWrapper>
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRouteWrapper><About /></AnimatedRouteWrapper>
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRouteWrapper><Services /></AnimatedRouteWrapper>
            </PublicLayout>
          }
        />
        <Route
          path="/products"
          element={
            <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRouteWrapper><Products /></AnimatedRouteWrapper>
            </PublicLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRouteWrapper><Projects /></AnimatedRouteWrapper>
            </PublicLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRouteWrapper><Gallery /></AnimatedRouteWrapper>
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRouteWrapper><Contact /></AnimatedRouteWrapper>
            </PublicLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTopOnRoute />
        <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Router>
    </LanguageProvider>
  );
};

export default App;
