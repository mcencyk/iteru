import { useState } from 'react';

const F = "'Inter', sans-serif";
const FM = "'Montserrat', sans-serif";

export default function WelcomeModal({ onStart }) {
  const [closing, setClosing] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleStart() {
    setClosing(true);
    setTimeout(onStart, 280);
  }

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(0,8,18,0.82)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        animation: closing ? 'backdropFadeOut 0.28s ease forwards' : 'backdropFadeIn 0.3s ease',
      }} />

      {/* Outer wrapper — shimmer border lives here */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 601,
        width: 520,
        animation: closing ? 'modalFadeOut 0.26s ease forwards' : 'modalFadeIn 0.32s cubic-bezier(0.22,1,0.36,1)',
      }}>

        {/* Shimmer border track */}
        <div className="welcome-shimmer-track">
          <div className="welcome-shimmer-rotor" />
        </div>

        {/* Panel content */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: 'rgba(1,22,36,0.98)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 22,
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
          overflow: 'hidden',
          padding: '36px 36px 32px',
        }}>

          {/* Brand tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: '#28779c', borderRadius: 1 }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(40,160,200,0.7)', fontFamily: FM, letterSpacing: 2.5 }}>XOTA PRO</span>
          </div>

          <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', fontFamily: FM, letterSpacing: 0.3, marginBottom: 12 }}>
            Welcome to XOTA
          </div>

          <div style={{ fontSize: 13, fontWeight: 400, color: 'rgba(204,223,233,0.65)', fontFamily: F, lineHeight: 1.75, marginBottom: 24 }}>
            XOTA is an over-the-air software update management platform for connected vehicle fleets.
            Plan, execute, and monitor update campaigns across your entire fleet — from individual DRCs to full system deployments.
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {['Field Campaigns', 'Lab Testing', 'Fleet Analytics', 'Scheduled Updates', 'Criteria Management'].map(tag => (
              <span key={tag} style={{
                fontSize: 10, fontWeight: 600, color: 'rgba(40,160,200,0.8)',
                fontFamily: F, letterSpacing: 0.4,
                padding: '4px 10px', borderRadius: 20,
                background: 'rgba(40,119,156,0.12)',
                border: '1px solid rgba(40,119,156,0.28)',
              }}>{tag}</span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(21,63,83,0.7)', marginBottom: 24 }} />

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button
              onClick={handleStart}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', borderRadius: 8,
                background: hovered ? '#005a80' : '#004666',
                border: 'none',
                color: '#ccdfe9',
                fontSize: 10, fontWeight: 700, fontFamily: F,
                letterSpacing: 1.2, textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: hovered ? '0px 2px 8px rgba(0,37,55,0.48)' : '0px 1px 4px rgba(0,37,55,0.32)',
                transition: 'background 0.15s, box-shadow 0.15s',
              }}
            >
              Let's start
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
