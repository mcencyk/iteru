import { useState } from 'react';
import Sidebar from './Sidebar';

// ─── Status badge (reused from DashboardView) ────────────────────────────────
const STATUS = {
  RUNNING:    { bg: 'rgba(40,119,156,0.18)',  color: '#28a0c8', dot: '#28a0c8' },
  CREATED:    { bg: 'rgba(100,140,165,0.2)',   color: '#80b0c8', dot: '#80b0c8' },
  DRAFT:      { bg: 'rgba(170,135,25,0.22)',   color: '#c8a028', dot: '#c8a028' },
  COMPLETED:  { bg: 'rgba(40,140,80,0.2)',     color: '#38b060', dot: '#38b060' },
  FAILED:     { bg: 'rgba(180,40,40,0.22)',    color: '#cc3333', dot: '#cc3333' },
  CALCULATED: { bg: 'rgba(80,110,130,0.2)',    color: '#607890', dot: '#607890' },
};

function StatusBadge({ status }) {
  const cfg = STATUS[status] || STATUS['CALCULATED'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 99,
      background: cfg.bg, border: `1px solid ${cfg.dot}`,
      fontSize: 10, fontWeight: 700, color: cfg.color,
      fontFamily: "'Inter', sans-serif", letterSpacing: 0.5,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ─── Trend arrow ─────────────────────────────────────────────────────────────
function Trend({ dir }) {
  // dir: 'up' (positive/green), 'down' (negative/red), 'neutral'
  const color = dir === 'up' ? '#38b060' : dir === 'down' ? '#cc4433' : 'rgba(128,176,200,0.5)';
  if (dir === 'neutral') return (
    <span style={{ color, fontSize: 12, fontWeight: 700, lineHeight: 1 }}>→</span>
  );
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ display: 'inline', marginLeft: 2 }}>
      {dir === 'up'
        ? <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      }
    </svg>
  );
}

// ─── Small stat card ─────────────────────────────────────────────────────────
function StatCard({ value, unit, trend, label, sub }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: 'rgba(1,45,66,0.55)', border: '1px solid #153f53',
      borderRadius: 12, padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(128,176,200,0.7)', fontFamily: "'Inter', sans-serif" }}>
            {unit}
          </span>
        )}
        {trend && <Trend dir={trend} />}
      </div>
      <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(128,176,200,0.5)', fontFamily: "'Inter', sans-serif", letterSpacing: 0.8, textTransform: 'uppercase' }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: 9, fontWeight: 500, color: 'rgba(128,176,200,0.35)', fontFamily: "'Inter', sans-serif" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── Progress stat card ───────────────────────────────────────────────────────
function ProgressCard({ value, trend, label, barColor, barWidth }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: 'rgba(1,45,66,0.55)', border: '1px solid #153f53',
      borderRadius: 12, padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
            {value}
          </span>
          <Trend dir={trend} />
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(128,176,200,0.5)', fontFamily: "'Inter', sans-serif", letterSpacing: 0.8, textTransform: 'uppercase' }}>
          {label}
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ height: '100%', borderRadius: 2, width: barWidth, background: barColor, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

// ─── Filter dropdown (visual only) ───────────────────────────────────────────
function FilterDropdown({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '5px 12px', borderRadius: 8,
        background: hovered ? 'rgba(0,70,102,0.3)' : 'rgba(1,45,66,0.55)',
        border: hovered ? '1px solid #28779c' : '1px solid #153f53',
        cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 500, color: '#ccdfe9', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(128,176,200,0.5)" strokeWidth="2" strokeLinecap="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
  );
}

// ─── Vehicle distribution bar ─────────────────────────────────────────────────
const VEHICLE_SEGMENTS = [
  { color: '#e03070', label: 'ERRORS',       pct: 17 },
  { color: '#e08020', label: 'DOWNLOADING',  pct: 30 },
  { color: '#c8a020', label: 'INITIALIZING', pct: 27 },
  { color: '#38b060', label: 'INSTALLING',   pct: 12 },
  { color: '#28a0c8', label: 'CHECKING',     pct: 7  },
  { color: '#8060c8', label: 'POSTPONED',    pct: 7  },
];

// Sub-segment detail data per main segment
const SUB_SEGMENTS = [
  [{ label: 'Downloading',  pct: 42, color: '#e03070' }, { label: 'Verifying',   pct: 33, color: '#c02858' }, { label: 'Pending',     pct: 25, color: '#801840' }],
  [{ label: 'Installing',   pct: 50, color: '#e08020' }, { label: 'Rebooting',   pct: 22, color: '#b86010' }, { label: 'Queued',      pct: 28, color: '#804008' }],
  [{ label: 'Transferring', pct: 46, color: '#c8a020' }, { label: 'Connecting',  pct: 36, color: '#a07818' }, { label: 'Waiting',     pct: 18, color: '#705010' }],
  [{ label: 'Finalizing',   pct: 58, color: '#38b060' }, { label: 'Verifying',   pct: 42, color: '#288048' }],
  [{ label: 'Downloading',  pct: 55, color: '#28a0c8' }, { label: 'Pending',     pct: 45, color: '#1870a0' }],
  [{ label: 'Scheduled',    pct: 48, color: '#8060c8' }, { label: 'Queued',      pct: 52, color: '#604098' }],
];

function ShowVinsButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '6px 14px', borderRadius: 8,
        background: hovered ? '#005a80' : '#004666',
        border: 'none',
        color: '#ccdfe9',
        fontSize: 10, fontWeight: 700,
        fontFamily: "'Inter', sans-serif", letterSpacing: 0.8, cursor: 'pointer',
        transition: 'background 0.15s, box-shadow 0.15s',
        boxShadow: hovered ? '0px 2px 8px 0px rgba(0,37,55,0.48)' : '0px 1px 4px 0px rgba(0,37,55,0.32)',
      }}
    >
      SHOW VINS
    </button>
  );
}

function CloseDetailBtn({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 24, height: 24, borderRadius: 6, border: '1px solid #1e5068',
          background: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)',
          color: hovered ? '#ccdfe9' : 'rgba(128,176,200,0.7)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, transition: 'all 0.15s',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      {hovered && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
          transform: 'translateX(-50%)',
          padding: '3px 8px', borderRadius: 4,
          background: '#012d42', border: '1px solid #153f53',
          fontSize: 10, fontWeight: 600, color: '#80b0c8',
          fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
          pointerEvents: 'none', zIndex: 20,
        }}>
          Close
        </div>
      )}
    </div>
  );
}

function VehicleBar({ totalVehicles }) {
  const [hoveredSeg, setHoveredSeg] = useState(null);
  const [selectedSeg, setSelectedSeg] = useState(null);
  const [closingDetail, setClosingDetail] = useState(false);
  const total = parseInt(String(totalVehicles).replace(/\s/g, ''), 10) || 0;

  function handleSegClick(i) {
    if (selectedSeg === i) {
      handleCloseDetail();
    } else {
      setClosingDetail(false);
      setSelectedSeg(i);
    }
  }

  function handleCloseDetail() {
    setClosingDetail(true);
  }

  function handleDetailAnimEnd() {
    if (closingDetail) {
      setSelectedSeg(null);
      setClosingDetail(false);
    }
  }

  const activeSeg = selectedSeg !== null ? VEHICLE_SEGMENTS[selectedSeg] : null;
  const subSegs = selectedSeg !== null ? SUB_SEGMENTS[selectedSeg] : [];
  const segCount = activeSeg ? Math.round(total * activeSeg.pct / 100) : 0;

  return (
    <>
      {/* Segmented bar */}
      <div style={{ display: 'flex', height: 28, borderRadius: 6, overflow: 'visible', gap: 2, animation: 'barEnter 0.55s cubic-bezier(0.22,1,0.36,1) both' }}>
        {VEHICLE_SEGMENTS.map((seg, i) => {
          const count = Math.round(total * seg.pct / 100);
          const isHovered = hoveredSeg === i;
          const isSelected = selectedSeg === i;
          const activeHighlight = hoveredSeg !== null ? hoveredSeg : selectedSeg;
          const isDimmed = activeHighlight !== null && activeHighlight !== i;
          const isFirst = i === 0;
          const isLast = i === VEHICLE_SEGMENTS.length - 1;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredSeg(i)}
              onMouseLeave={() => setHoveredSeg(null)}
              onClick={() => handleSegClick(i)}
              style={{
                flex: seg.pct,
                background: seg.color,
                borderRadius: isFirst ? '6px 0 0 6px' : isLast ? '0 6px 6px 0' : 0,
                opacity: isDimmed ? 0.22 : 1,
                cursor: 'pointer',
                position: 'relative',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                transform: isHovered ? 'scaleY(1.12)' : 'scaleY(1)',
                transformOrigin: 'center',
              }}
            >
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 10px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#012d42',
                  border: '1px solid #153f53',
                  borderRadius: 8,
                  padding: '7px 12px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 10,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  animation: 'tooltipFadeIn 0.15s ease',
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}>
                    {seg.pct}%
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(128,176,200,0.6)', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
                    {count.toLocaleString()} Vehicles
                  </div>
                  {/* Arrow */}
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                    width: 0, height: 0,
                    borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
                    borderTop: '5px solid #153f53',
                  }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sub-segment detail panel */}
      {selectedSeg !== null && (
        <div
          onAnimationEnd={handleDetailAnimEnd}
          style={{
            marginTop: -6,
            background: 'rgba(0,16,28,0.82)',
            border: `1px solid ${activeSeg.color}44`,
            borderTop: `2px solid ${activeSeg.color}88`,
            borderRadius: '0 0 8px 8px',
            padding: '10px 14px 12px',
            display: 'flex', flexDirection: 'column', gap: 10,
            position: 'relative', zIndex: 2,
            animation: closingDetail
              ? 'detailSlideOut 0.22s ease forwards'
              : 'detailSlideIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {/* Detail header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff', fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                {segCount.toLocaleString()}
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, color: activeSeg.color, fontFamily: "'Inter', sans-serif", letterSpacing: 0.8, textTransform: 'uppercase' }}>
                {activeSeg.label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShowVinsButton />
              <CloseDetailBtn onClick={handleCloseDetail} />
            </div>
          </div>

          {/* Sub-segment bar */}
          <div style={{ display: 'flex', height: 22, borderRadius: 4, overflow: 'hidden', gap: 2 }}>
            {subSegs.map((sub, j) => {
              const isFirst = j === 0;
              const isLast = j === subSegs.length - 1;
              return (
                <div
                  key={j}
                  style={{
                    flex: sub.pct,
                    background: sub.color,
                    borderRadius: isFirst ? '4px 0 0 4px' : isLast ? '0 4px 4px 0' : 0,
                  }}
                />
              );
            })}
          </div>

          {/* Sub-segment legend */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {subSegs.map((sub, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: sub.color, flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(180,210,225,0.75)', fontFamily: "'Inter', sans-serif", letterSpacing: 0.4 }}>
                  {sub.label}
                </span>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(220,235,245,0.92)', fontFamily: "'Inter', sans-serif" }}>
                  {sub.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {VEHICLE_SEGMENTS.map((seg, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredSeg(i)}
            onMouseLeave={() => setHoveredSeg(null)}
            onClick={() => handleSegClick(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
              opacity: (hoveredSeg !== null ? hoveredSeg : selectedSeg) !== null && (hoveredSeg !== null ? hoveredSeg : selectedSeg) !== i ? 0.35 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: 9, fontWeight: 600, color: hoveredSeg === i || selectedSeg === i ? seg.color : 'rgba(128,176,200,0.6)', fontFamily: "'Inter', sans-serif", letterSpacing: 0.5, transition: 'color 0.2s ease' }}>
              {seg.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Bottom action bar ────────────────────────────────────────────────────────
function BottomTab({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '6px 14px', borderRadius: 8,
        background: active ? '#004666' : hovered ? '#013d58' : 'transparent',
        border: active ? '2px solid #28779c' : hovered ? '2px solid #1e6080' : '2px solid transparent',
        color: active ? '#ffffff' : hovered ? '#ccdfe9' : 'rgba(128,176,200,0.7)',
        fontSize: 11, fontWeight: 700, cursor: 'pointer',
        fontFamily: "'Inter', sans-serif", letterSpacing: 0.8,
        boxShadow: active ? '0px 0px 8px 0px rgba(40,119,156,0.32)' : 'none',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  );
}

function IconBtn({ children, tooltip, danger }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 32, height: 32, borderRadius: 8, border: 'none',
          background: danger
            ? (hovered ? 'rgba(180,40,40,0.35)' : 'rgba(180,40,40,0.2)')
            : (hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'),
          color: danger ? (hovered ? '#ff6060' : '#cc4433') : (hovered ? '#ccdfe9' : 'rgba(128,176,200,0.7)'),
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
      >
        {children}
      </button>
      {hovered && tooltip && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 7px)', left: '50%',
          transform: 'translateX(-50%)',
          padding: '3px 8px', borderRadius: 4,
          background: '#012d42', border: '1px solid #153f53',
          fontSize: 10, fontWeight: 600, color: '#80b0c8',
          fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
          pointerEvents: 'none', zIndex: 20,
        }}>
          {tooltip}
        </div>
      )}
    </div>
  );
}

const LOAD_STEPS_BACK = [
  'Syncing campaign updates',
  'Refreshing campaign list',
  'Loading dashboard',
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function CampaignDetailView({ campaign, onBack }) {
  const [activeNav, setActiveNav] = useState('aftersales');
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [loadingBack, setLoadingBack] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [loadStep, setLoadStep] = useState(0);

  function handleBack() {
    setLoadingBack(true);
    setLoadStep(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setLoaderVisible(true)));
    setTimeout(() => setLoadStep(1), 450);
    setTimeout(() => setLoadStep(2), 900);
    setTimeout(() => setLoaderVisible(false), 1300);
    setTimeout(() => onBack(), 1600);
  }

  if (loadingBack) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '100vw', height: '100vh',
        background: 'radial-gradient(ellipse 80% 70% at 50% 30%, #005478 0%, #004060 40%, #002233 100%)',
        backgroundColor: '#003050',
      }}>
        <div style={{
          opacity: loaderVisible ? 1 : 0, transition: 'opacity 0.3s ease',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(128,176,200,0.6)', fontFamily: "'Inter', sans-serif", letterSpacing: 0.5 }}>
              Returning to dashboard
            </div>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            border: '2px solid rgba(128,176,200,0.15)', borderTopColor: '#28a0c8',
            animation: 'gvuSpin 0.85s linear infinite',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LOAD_STEPS_BACK.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: 0.2,
                color: i < loadStep ? 'rgba(56,176,96,0.85)' : i === loadStep ? 'rgba(204,223,233,0.9)' : 'rgba(128,176,200,0.2)',
                transition: 'color 0.3s ease',
              }}>
                <span style={{ width: 14, display: 'flex', justifyContent: 'center', fontSize: i < loadStep ? 11 : 13 }}>
                  {i < loadStep ? '✓' : i === loadStep ? '›' : '·'}
                </span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const status = campaign.statuses[0];

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw',
      background: 'radial-gradient(ellipse 80% 70% at 50% 30%, #005478 0%, #004060 40%, #002233 100%)',
      backgroundColor: '#003050',
      padding: 24, gap: 24, boxSizing: 'border-box', overflow: 'hidden',
    }}>
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} attentionCount={2} />

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, position: 'relative' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          {/* Back button */}
          <button
            onClick={handleBack}
            style={{
              width: 32, height: 32, borderRadius: 8, border: '1px solid #153f53',
              background: 'rgba(1,45,66,0.55)', color: 'rgba(128,176,200,0.8)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#28779c'; e.currentTarget.style.color = '#ccdfe9'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#153f53'; e.currentTarget.style.color = 'rgba(128,176,200,0.8)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>

          {/* Campaign name */}
          <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', fontFamily: "'Montserrat', sans-serif", letterSpacing: 0.3, whiteSpace: 'nowrap' }}>
            {campaign.name}
          </span>

          {/* Divider */}
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />

          {/* Meta info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0, overflow: 'hidden' }}>
            <MetaItem label="INPUT CAMPAIGN" value="CD01_01_TEST INPUT" />
            <MetaItem label="SPECIFICATION MODEL" value="ABS SPRING UPDATE 4" />
            <MetaItem label="CREATOR" value="MIKE DEAN" />
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Status */}
          <StatusBadge status={status} />
        </div>

        {/* ── Filter bar ── */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <FilterDropdown label="All Countries" />
          <FilterDropdown label="All Product IDs" />
          <FilterDropdown label="All Waves" />
        </div>

        {/* ── Stats ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
          {/* Row 1: 6 small cards */}
          <div style={{ display: 'flex', gap: 10 }}>
            <StatCard value="23" unit="days" label="Since start (31.04.2024)" />
            <StatCard value="3" label="Models" />
            <StatCard value="5" label="Countries" />
            <StatCard value="532" unit="sec" trend="down" label="Average update speed" />
            <StatCard value="839" unit="sec" trend="up" label="Average download speed" />
            <StatCard value="314" unit="cars" trend="down" label="Updated vehicles each day" />
          </div>

          {/* Row 2: 3 progress cards */}
          <div style={{ display: 'flex', gap: 10 }}>
            <ProgressCard
              value="100%"
              trend="neutral"
              label="Launch rate"
              barColor="linear-gradient(90deg, #28779c 0%, #28a0c8 100%)"
              barWidth="100%"
            />
            <ProgressCard
              value="92%"
              trend="down"
              label="Success rate"
              barColor="linear-gradient(90deg, #28779c 0%, #28a0c8 100%)"
              barWidth="92%"
            />
            <ProgressCard
              value="8%"
              trend="up"
              label="Failure rate"
              barColor="linear-gradient(90deg, #8b2020 0%, #cc3333 100%)"
              barWidth="8%"
            />
          </div>
        </div>

        {/* ── Vehicle distribution ── */}
        <div style={{
          flexShrink: 0,
          background: 'rgba(1,45,66,0.55)', border: '1px solid #153f53',
          borderRadius: 16, padding: '14px 20px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>{campaign.vehicles}</span>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(128,176,200,0.5)', fontFamily: "'Inter', sans-serif", letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 }}>Vehicles</div>
            </div>
            <ShowVinsButton />
          </div>

          <VehicleBar totalVehicles={campaign.vehicles} />
        </div>

        {/* ── Bottom action bar (floating) ── */}
        <div style={{
          position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 8px', borderRadius: 14,
          background: 'rgba(1,28,42,0.72)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(21,63,83,0.6)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
        }}>
          <BottomTab label="OVERVIEW" active={activeTab === 'OVERVIEW'} onClick={() => setActiveTab('OVERVIEW')} />
          <BottomTab label="WAVES" active={activeTab === 'WAVES'} onClick={() => setActiveTab('WAVES')} />

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

          {/* Icon buttons */}
          <IconBtn tooltip="Configure">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </IconBtn>
          <IconBtn tooltip="Refresh">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </IconBtn>
          <IconBtn tooltip="Abort campaign" danger>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </IconBtn>
        </div>

      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, minWidth: 0, overflow: 'hidden' }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(128,176,200,0.45)', fontFamily: "'Inter', sans-serif", letterSpacing: 0.8, textTransform: 'uppercase', flexShrink: 0 }}>
        {label}:
      </span>
      <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(128,176,200,0.85)', fontFamily: "'Inter', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </span>
    </div>
  );
}
