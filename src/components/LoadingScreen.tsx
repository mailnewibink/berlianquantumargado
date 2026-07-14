import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Fades out after 2.2 seconds
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0F172A', // Navy theme background during load
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Modern Medical Pulse Glow Icon */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              border: '2px solid #06B6D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
              animation: 'pulseGlow 2s infinite ease-in-out',
            }}
          >
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#06B6D4', fontFamily: 'Manrope' }}>BQA</span>
          </div>
          {/* Scanning Line overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: '#2563EB',
              boxShadow: '0 0 15px #2563EB',
              animation: 'scanLine 2s infinite ease-in-out',
            }}
          />
        </div>

        {/* Company Title */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'Manrope',
              fontSize: '1.5rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            Berlian Quantum Argado
          </h1>
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '0.875rem',
              color: '#94A3B8',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '0.25rem',
            }}
          >
            Healthcare Engineering Excellence
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 50px rgba(37, 99, 235, 0.5);
            border-color: #2563EB;
          }
        }
        @keyframes scanLine {
          0% {
            top: 5%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 95%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
