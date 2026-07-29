import { FiZap, FiAward, FiPieChart, FiDroplet } from 'react-icons/fi';

export default function NutritionPanel({ nutrition, servings }) {
  const data = nutrition || {
    calories: '400',
    protein: '18g',
    carbs: '55g',
    fat: '12g',
  };

  const items = [
    {
      label: 'Energy',
      value: data.calories || '400',
      icon: <FiZap style={{ fontSize: '28px', color: '#FF6B8B' }} />,
      bg: '#FFE5EC',
    },
    {
      label: 'Strong Muscles',
      value: data.protein || '18g',
      icon: <FiAward style={{ fontSize: '28px', color: '#2D6B2D' }} />,
      bg: '#E2FBE2',
    },
    {
      label: 'Happy Carbs',
      value: data.carbs || '55g',
      icon: <FiPieChart style={{ fontSize: '28px', color: '#D97706' }} />,
      bg: '#FFF8DC',
    },
    {
      label: 'Good Fats',
      value: data.fat || '12g',
      icon: <FiDroplet style={{ fontSize: '28px', color: '#DB2777' }} />,
      bg: '#FCE7F3',
    },
  ];

  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto 60px auto', padding: '0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <h2 style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '32px',
          fontWeight: 700,
          color: '#4A3728',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          Good Stuff Inside 🍎
        </h2>
        {servings && (
          <span style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: '#FF6B8B',
            background: '#FFE5EC',
            border: '1.5px solid #FFB3C6',
            borderRadius: '99px',
            padding: '3px 12px',
          }}>
            for {servings} {servings === 1 ? 'serving' : 'servings'}
          </span>
        )}
      </div>

      {/* 4 Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
      }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              border: '4px solid #FFFACD',
              borderRadius: '28px',
              padding: '32px 20px',
              boxShadow: '0 12px 0px rgba(255, 209, 220, 0.45), 0 16px 32px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
          >
            {/* Symbol Circle */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: item.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px',
            }}>
              {item.icon}
            </div>

            {/* Value */}
            <div style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#1A120B',
            }}>
              {item.value}
            </div>

            {/* Label */}
            <div style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '15px',
              fontWeight: 700,
              color: '#8A7366',
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
