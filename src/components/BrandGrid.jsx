// logoSize: optical size override per brand (maxWidth, maxHeight)
const BRANDS = [
  { id: 'audi',  name: 'Audi',       logo: '/assets/audi.svg',  variants: ['Commercial','Public','Test'], logoSize: { maxWidth: 82, maxHeight: 28 } },
  { id: 'ford',  name: 'Ford',       logo: '/assets/ford.svg',  variants: ['Commercial','Public'],        logoSize: { maxWidth: 76, maxHeight: 30 } },
  { id: 'vw',    name: 'Volkswagen', logo: '/assets/vw.svg',    variants: ['Commercial','Public','Test'], logoSize: { maxWidth: 52, maxHeight: 52 } },
  { id: 'skoda', name: 'Skoda',      logo: '/assets/skoda.svg', variants: ['Commercial','Public'],        logoSize: { maxWidth: 52, maxHeight: 52 } },
  { id: 'seat',  name: 'SEAT',       logo: '/assets/seat.svg',  variants: ['Commercial','Public','Test'], logoSize: { maxWidth: 52, maxHeight: 36 } },
  { id: 'volvo', name: 'Volvo',      logo: '/assets/volvo.svg', variants: ['Commercial'],                 logoSize: { maxWidth: 52, maxHeight: 52 } },
];

const cardBase = {
  flex: 1,
  height: 94,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  border: '1px solid #153f53',
  background: '#012d42',
  boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.24)',
  cursor: 'pointer',
  transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
  position: 'relative',
  overflow: 'hidden',
};

const cardActive = {
  background: '#00354d',
  border: '2px solid #28779c',
  boxShadow: '0px 0px 8px 0px rgba(40,119,156,0.32), inset 0px 0px 4px 0px rgba(0,0,0,0.24)',
};

export default function BrandGrid({ selected, onSelect }) {
  const rows = [BRANDS.slice(0, 3), BRANDS.slice(3, 6)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 8 }}>
          {row.map(brand => {
            const active = selected === brand.id;
            return (
              <div
                key={brand.id}
                style={{ ...cardBase, ...(active ? cardActive : {}) }}
                onClick={() => onSelect(brand)}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    maxWidth: brand.logoSize.maxWidth,
                    maxHeight: brand.logoSize.maxHeight,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export { BRANDS };
