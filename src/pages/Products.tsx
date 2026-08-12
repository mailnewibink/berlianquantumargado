import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Product {
  id: string;
  name: string;
  category: string;
  specs: string;
  desc: string;
  image: string;
}

export const Products: React.FC = () => {
  const { t, language } = useLanguage();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('cat') || 'All';
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = language === 'id' ? [
    "Semua", "Lembaran Timbal", "Kaca Timbal", "Pintu Timbal", "Pass Box",
    "Wastafel Scrub", "Pelindung Dinding", "Pegangan Tangan", "Lantai Vinyl",
    "Mebel Laboratorium", "Pencahayaan", "Aksesoris"
  ] : [
    "All", "Lead Sheet", "Lead Glass", "Lead Door", "Pass Box",
    "Scrub Sink", "Wall Guard", "Handrail", "Vinyl Flooring",
    "Laboratory Furniture", "Lighting", "Accessories"
  ];

  const productsList: Product[] = [
    { id: "ls-1", image: "/images/hospital_construction.png", name: t('productsPage.productsList.0.name'), category: t('productsPage.productsList.0.category'), specs: t('productsPage.productsList.0.specs'), desc: t('productsPage.productsList.0.desc') },
    { id: "lg-1", image: "/images/radiation_shielding.png", name: t('productsPage.productsList.1.name'), category: t('productsPage.productsList.1.category'), specs: t('productsPage.productsList.1.specs'), desc: t('productsPage.productsList.1.desc') },
    { id: "ld-1", image: "/images/hospital_construction.png", name: t('productsPage.productsList.2.name'), category: t('productsPage.productsList.2.category'), specs: t('productsPage.productsList.2.specs'), desc: t('productsPage.productsList.2.desc') },
    { id: "pb-1", image: "/images/pass_box.png", name: t('productsPage.productsList.3.name'), category: t('productsPage.productsList.3.category'), specs: t('productsPage.productsList.3.specs'), desc: t('productsPage.productsList.3.desc') },
    { id: "ss-1", image: "/images/scrub_sink.png", name: t('productsPage.productsList.4.name'), category: t('productsPage.productsList.4.category'), specs: t('productsPage.productsList.4.specs'), desc: t('productsPage.productsList.4.desc') },
    { id: "wg-1", image: "/images/hero_background.png", name: t('productsPage.productsList.5.name'), category: t('productsPage.productsList.5.category'), specs: t('productsPage.productsList.5.specs'), desc: t('productsPage.productsList.5.desc') },
    { id: "hr-1", image: "/images/hero_background.png", name: t('productsPage.productsList.6.name'), category: t('productsPage.productsList.6.category'), specs: t('productsPage.productsList.6.specs'), desc: t('productsPage.productsList.6.desc') },
    { id: "vf-1", image: "/images/hospital_construction.png", name: t('productsPage.productsList.7.name'), category: t('productsPage.productsList.7.category'), specs: t('productsPage.productsList.7.specs'), desc: t('productsPage.productsList.7.desc') },
    { id: "lf-1", image: "/images/pass_box.png", name: t('productsPage.productsList.8.name'), category: t('productsPage.productsList.8.category'), specs: t('productsPage.productsList.8.specs'), desc: t('productsPage.productsList.8.desc') },
    { id: "li-1", image: "/images/medical_equipment.png", name: t('productsPage.productsList.9.name'), category: t('productsPage.productsList.9.category'), specs: t('productsPage.productsList.9.specs'), desc: t('productsPage.productsList.9.desc') },
    { id: "acc-1", image: "/images/radiation_shielding.png", name: t('productsPage.productsList.10.name'), category: t('productsPage.productsList.10.category'), specs: t('productsPage.productsList.10.specs'), desc: t('productsPage.productsList.10.desc') }
  ];

  // Filter logic
  const filteredProducts = productsList.filter(prod => {
    const matchesCategory = categoryFilter === 'All' || categoryFilter === 'Semua' || prod.category === categoryFilter;
    const matchesSearch = prod.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.specs.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.desc.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination config
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter, categoryFilter]);

  const handleCategoryChange = (cat: string) => {
    setSearchParams({ cat, search: searchFilter });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ cat: categoryFilter, search: e.target.value });
  };

  const createWhatsAppInquiry = (productName: string) => {
    return `https://wa.me/6281234567890?text=Hello%20PT%20Berlian%20Quantum%20Argado,%20I%20would%20like%20to%20request%20a%20price%20quote%20and%20technical%20specification%20sheet%20for:%20${encodeURIComponent(productName)}`;
  };

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
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-medical-blue)', letterSpacing: '0.25em', fontWeight: 600 }}>{t('productsPage.tag')}</span>
            <h1 style={{ fontSize: '3rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: '0.5rem' }}>{t('productsPage.heading')}</h1>
            <p style={{ maxWidth: '750px', color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6' }}>{t('productsPage.desc')}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Catalog Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Search Input and active category count */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
                <input
                  type="text"
                  placeholder={t('productsPage.searchPlaceholder')}
                  value={searchFilter}
                  onChange={handleSearchChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.5rem 0.85rem 3rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--glass-border)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontFamily: 'Inter',
                  }}
                />
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '1.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {t('productsPage.showing')} <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{filteredProducts.length}</span> {t('productsPage.items')}
              </div>
            </div>

            {/* Horizontal Filter Buttons */}
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
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: categoryFilter === cat ? 'var(--color-medical-blue)' : 'var(--glass-border)',
                    backgroundColor: categoryFilter === cat ? 'var(--color-medical-blue)' : 'transparent',
                    color: categoryFilter === cat ? '#FFFFFF' : 'var(--text-secondary)',
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

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {paginatedProducts.map((prod, idx) => (
                  <motion.div
                    key={prod.id}
                    layoutId={`product-${prod.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="glass-card"
                    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <div style={{ height: '220px', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          color: 'var(--color-cyan)',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {prod.category}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 800, margin: 0 }}>
                        {prod.name}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, fontFamily: 'monospace' }}>
                        {prod.specs}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        {prod.desc}
                      </p>

                      <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', paddingTop: '1.5rem' }}>
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: '1px solid var(--text-primary)',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <Info size={16} /> Specs
                        </button>
                        <a
                          href={createWhatsAppInquiry(prod.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            fontSize: '0.85rem',
                            justifyContent: 'center',
                            boxShadow: 'none',
                          }}
                        >
                          <MessageSquare size={16} /> Quote
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                <ShieldAlert size={48} style={{ margin: '0 auto 1rem auto', color: 'var(--color-cyan)' }} />
                <h3>{t('productsPage.noResults')}</h3>
                <p style={{ marginTop: '0.5rem' }}>{t('productsPage.tryClearing')}</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px solid',
                      borderColor: currentPage === page ? 'var(--color-medical-blue)' : 'var(--glass-border)',
                      backgroundColor: currentPage === page ? 'var(--color-medical-blue)' : 'transparent',
                      color: currentPage === page ? '#FFFFFF' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Product Detail Spec Sheets Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
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
              backgroundColor: 'rgba(9, 13, 22, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100000,
              padding: '2rem',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '650px',
                padding: '2.5rem',
                backgroundColor: 'var(--bg-primary)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontFamily: 'Manrope', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {selectedProduct.name}
              </h2>
              <span
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  color: 'var(--color-medical-blue)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  display: 'inline-block',
                  marginBottom: '1.5rem',
                }}
              >
                Category: {selectedProduct.category}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{t('productsPage.specsTitle')}</h4>
                  <p style={{ fontFamily: 'monospace', color: 'var(--color-cyan)', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>
                    {selectedProduct.specs}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{t('productsPage.descTitle')}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                    {selectedProduct.desc}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{t('productsPage.noteTitle')}</p>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>{t('productsPage.noteDesc')}</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    style={{
                      flex: 1,
                      padding: '0.85rem',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >{t('productsPage.closeSheet')}</button>
                  <a
                    href={createWhatsAppInquiry(selectedProduct.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ flex: 1.5, justifyContent: 'center' }}
                  >{t('productsPage.requestQuote')}</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
