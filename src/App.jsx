import { useState, useEffect } from 'react';
import FloatingInput from './components/FloatingInput';
import BrandGrid, { BRANDS } from './components/BrandGrid';
import VariantSelect from './components/VariantSelect';
import DashboardView from './components/DashboardView';
import './App.css';

const defaultBrand = BRANDS.find(b => b.id === 'audi');

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

function AppButton({ children, primary, fullWidth, onClick }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    padding: '10px 18px', borderRadius: 8,
    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 10,
    letterSpacing: 1.2, textTransform: 'uppercase', color: '#ccdfe9',
    cursor: 'pointer', transition: 'background 0.15s, box-shadow 0.15s, border-color 0.15s',
    ...(fullWidth ? { flex: 1 } : {}),
  };

  const style = primary
    ? {
        ...base,
        background: hovered ? '#005a80' : '#004666',
        border: 'none',
        boxShadow: hovered
          ? '0px 2px 8px 0px rgba(0,37,55,0.48)'
          : '0px 1px 4px 0px rgba(0,37,55,0.32)',
      }
    : {
        ...base,
        background: hovered ? '#01374f' : '#012d42',
        border: hovered ? '1px solid #1e6080' : '1px solid #004666',
      };

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeBrand, setActiveBrand] = useState(defaultBrand);
  const [selectedVariant, setSelectedVariant] = useState(defaultBrand.variants[0]);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 560;

  if (loggedIn) {
    return <DashboardView onLogout={() => setLoggedIn(false)} />;
  }

  function handleBrandSelect(brand) {
    setActiveBrand(brand);
    setSelectedVariant(brand.variants[0]);
  }

  if (isMobile) {
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        paddingTop: 48,
        paddingBottom: 32,
      }}>

        {/* Title */}
        <div style={{ textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, padding: '0 16px' }}>
          <div style={{ fontSize: 34, letterSpacing: 0.853, color: '#ffffff', lineHeight: 1.3 }}>
            CMT
          </div>
          <div style={{ fontSize: 20, letterSpacing: 6, color: '#ccdfe9', opacity: 0.5, lineHeight: 1.3, paddingLeft: 8 }}>
            PRO
          </div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Inputs stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
            <FloatingInput label="User" type="text" />
            <FloatingInput label="Password" type="password" />
          </div>

          {/* Brand grid — 2 columns, full width */}
          <div style={{ padding: '0 16px' }}>
            <BrandGrid selected={activeBrand.id} onSelect={handleBrandSelect} cols={2} cardHeight={90} logoScale={0.9} />
          </div>

          {/* Variant dropdown */}
          <div style={{ padding: '0 16px' }}>
            <VariantSelect
              brandName={activeBrand.name}
              variants={activeBrand.variants}
              selected={selectedVariant}
              onSelect={setSelectedVariant}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 8, padding: '0 16px' }}>
          <AppButton fullWidth>Help</AppButton>
          <AppButton primary fullWidth onClick={() => setLoggedIn(true)}>Login</AppButton>
        </div>

      </div>
    );
  }

  return (
    <div style={{
      width: 496,
      padding: '56px 24px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 48,
      background: 'rgba(1,45,66,0.75)',
      border: '1px solid #153f53',
      borderRadius: 24,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: '0px 0px 16px 0px rgba(0,0,0,0.16)',
    }}>

      {/* Title */}
      <div style={{ textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
        <div style={{ fontSize: 42.647, letterSpacing: 0.853, color: '#ffffff', lineHeight: 1.3 }}>
          CMT
        </div>
        <div style={{ fontSize: 25.588, letterSpacing: 8.188, color: '#ccdfe9', opacity: 0.5, lineHeight: 1.3, paddingLeft: 8 }}>
          PRO
        </div>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Inputs */}
        <div style={{ display: 'flex', gap: 12 }}>
          <FloatingInput label="User" type="text" />
          <FloatingInput label="Password" type="password" />
        </div>

        {/* Brand grid */}
        <BrandGrid selected={activeBrand.id} onSelect={handleBrandSelect} />

        {/* Variant dropdown */}
        <VariantSelect
          brandName={activeBrand.name}
          variants={activeBrand.variants}
          selected={selectedVariant}
          onSelect={setSelectedVariant}
        />
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <AppButton>Help</AppButton>
          <AppButton primary onClick={() => setLoggedIn(true)}>Login</AppButton>
        </div>
      </div>

    </div>
  );
}
