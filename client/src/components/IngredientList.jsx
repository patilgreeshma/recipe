import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

const EMOJI_MAP = {
  cheese: '🧀',
  paneer: '🧀',
  tomato: '🍅',
  tomatoes: '🍅',
  butter: '🧈',
  onion: '🧅',
  onions: '🧅',
  garlic: '🧄',
  rice: '🌾',
  milk: '🥛',
  chicken: '🍗',
  egg: '🥚',
  eggs: '🥚',
  tofu: '🧊',
  oil: '🫒',
  salt: '🧂',
  pepper: '🌶️',
  capsicum: '🫑',
  lemon: '🍋',
};

function getEmojiForIngredient(name) {
  const lower = (name || '').toLowerCase();
  for (const [key, emoji] of Object.entries(EMOJI_MAP)) {
    if (lower.includes(key)) return emoji;
  }
  return '🥗';
}

export default function IngredientList({ ingredients, checkedItems, onToggle }) {
  const items = ingredients && ingredients.length > 0 ? ingredients : [
    { name: 'Magic Cheese', quantity: 250, unit: 'g (cubes)' },
    { name: 'Red Tommies', quantity: 3, unit: 'big ones' },
    { name: 'Yellow Butter', quantity: 2, unit: 'big spoons' },
    { name: 'Happy Onion', quantity: 1, unit: 'round one' },
  ];

  return (
    <div style={{ flex: 1 }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <h2 style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '32px',
          fontWeight: 700,
          color: '#4A3728',
          margin: 0,
        }}>
          Gather Items 🛒
        </h2>
        <a
          href="#shop"
          onClick={(e) => e.preventDefault()}
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '15px',
            fontWeight: 700,
            color: '#FF6B8B',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Shop Now!
        </a>
      </div>

      {/* Grid of 2 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {items.map((item, idx) => {
          const isChecked = Boolean(checkedItems[idx]);
          return (
            <div
              key={idx}
              onClick={() => onToggle(idx)}
              style={{
                background: isChecked ? '#EBFCEB' : '#ffffff',
                border: isChecked ? '3px solid #7BC67E' : '3px solid #FFFACD',
                borderRadius: '22px',
                padding: '16px 20px',
                boxShadow: isChecked
                  ? '0 6px 0px rgba(123, 198, 126, 0.3)'
                  : '0 8px 0px rgba(255, 209, 220, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '32px' }}>
                  {getEmojiForIngredient(item.name)}
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#1A120B',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    opacity: isChecked ? 0.7 : 1,
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '14px',
                    color: '#8A7366',
                  }}>
                    {item.quantity} {item.unit}
                  </div>
                </div>
              </div>

              {/* Checkbox circle */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isChecked ? '#7BC67E' : '#ffffff',
                border: isChecked ? 'none' : '3px solid #FFD1DC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}>
                {isChecked && <FiCheck style={{ color: '#ffffff', fontSize: '18px', strokeWidth: 3 }} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
