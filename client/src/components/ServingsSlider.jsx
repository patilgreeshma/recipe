import { useState } from 'react';

export default function ServingsSlider({ servings, onChange }) {
  return (
    <div style={{
      background: 'rgba(255, 250, 205, 0.75)',
      border: '3px solid #FFFACD',
      borderRadius: '24px',
      padding: '24px 28px',
      boxShadow: '0 8px 16px rgba(255, 209, 220, 0.35)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <span style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '16px',
          fontWeight: 600,
          color: '#4A3728',
        }}>
          Make it for...
        </span>
        <span style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '20px',
          fontWeight: 600,
          color: '#FF6B8B',
        }}>
          {servings} {servings === 1 ? 'friend' : 'friends'}
        </span>
      </div>

      <input
        type="range"
        min={1}
        max={12}
        value={servings}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          WebkitAppearance: 'none',
          appearance: 'none',
          height: '10px',
          borderRadius: '99px',
          background: `linear-gradient(to right, #7BC67E ${((servings - 1) / 11) * 100}%, #D4E8D0 ${((servings - 1) / 11) * 100}%)`,
          outline: 'none',
          cursor: 'pointer',
        }}
      />

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #FF6B8B;
          border: 4px solid #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(255,107,139,0.4);
        }
      `}</style>
    </div>
  );
}
