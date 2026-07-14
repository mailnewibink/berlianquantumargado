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

// Scroll mitigation component on route change
const ScrollToTopOnRoute: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's an anchor hash (e.g., /services#radiation), scroll to that element
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

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedRouteWrapper>
              <Home />
            </AnimatedRouteWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedRouteWrapper>
              <About />
            </AnimatedRouteWrapper>
          }
        />
        <Route
          path="/services"
          element={
            <AnimatedRouteWrapper>
              <Services />
            </AnimatedRouteWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <AnimatedRouteWrapper>
              <Products />
            </AnimatedRouteWrapper>
          }
        />
        <Route
          path="/projects"
          element={
            <AnimatedRouteWrapper>
              <Projects />
            </AnimatedRouteWrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <AnimatedRouteWrapper>
              <Gallery />
            </AnimatedRouteWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimatedRouteWrapper>
              <Contact />
            </AnimatedRouteWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode class state on body
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
        
        {/* Interactive and layout components */}
        <LoadingScreen />
        <CursorGlow />
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main style={{ minHeight: '80vh' }}>
          <AppRoutes />
        </main>

        <Footer />
        
        <FloatingWhatsApp />
        <ScrollToTop />
      </Router>
    </LanguageProvider>
  );
};

export default App;
