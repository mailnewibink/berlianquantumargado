import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt after 5 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const waLink = "https://wa.me/6281234567890?text=Hello%20PT%20Berlian%20Quantum%20Argado,%20I%20would%20like%20to%20inquire%20about%20your%20healthcare%20engineering%20services.";

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {showPrompt && (
        <div
          className="glass-panel"
          style={{
            padding: '0.875rem 1.25rem',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-medium)',
            maxWidth: '260px',
            position: 'relative',
            animation: 'fadeInUp 0.4s ease-out',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
          }}
        >
          <button
            onClick={() => setShowPrompt(false)}
            style={{
              position: 'absolute',
              top: '4px',
              right: '8px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
            }}
          >
            ×
          </button>
          <p style={{ fontWeight: 600, color: 'var(--color-medical-blue)', marginBottom: '0.15rem' }}>
            Direct Consultation
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Have healthcare engineering or shielding questions? Talk with our experts.
          </p>
        </div>
      )}

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#22C55E',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          textDecoration: 'none',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(34, 197, 94, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.3)';
        }}
      >
        <MessageSquare size={24} />
        {/* Dynamic Ping notification dot */}
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#FF3B30',
            border: '2px solid #FFFFFF',
            animation: 'pulsePing 1.5s infinite',
          }}
        />
      </a>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulsePing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
