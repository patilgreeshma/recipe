import { useState } from 'react';
import ServingsSlider from './ServingsSlider';

export default function RecipeHeader({ recipe, onStartCooking, servings, onServingsChange }) {
  const [liked, setLiked] = useState(false);

  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0px',
      position: 'relative',
      padding: '50px 40px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>

      {/* ── LEFT: Image Card ── */}
      <div style={{
        flexShrink: 0,
        width: '600px',
        height: '520px',
        borderRadius: '32px',
        overflow: 'visible',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '32px',
          overflow: 'hidden',
          border: '10px solid #ffffff',
          boxShadow: '0 16px 40px rgba(0,0,0,0.12), 0 8px 24px rgba(255, 209, 220, 0.4)',
        }}>
          <img
            src={recipe.imageUrl || '/hero-food.png'}
            alt={recipe.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Sparkle badge — top right corner */}
      
       
      </div>

      {/* ── RIGHT: Info Card (overlaps image & wider/lengthier) ── */}
      <div style={{
        background: '#ffffff',
        border: '4px solid #FFFACD',
        borderRadius: '32px',
        padding: '44px 40px',
        boxShadow: '0 16px 36px rgba(255, 209, 220, 0.5), 0 24px 48px rgba(0, 0, 0, 0.08)',
        width: '480px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 2,
        marginLeft: '-60px',
      }}>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
          <span style={{
            background: '#B2FBA5',
            color: '#2D6B2D',
            padding: '8px 16px',
            borderRadius: '99px',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: "'Quicksand', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 0px rgba(178,251,165,0.4)',
          }}>
            ⭐ Super {recipe.difficulty || 'Easy'}
          </span>
          <span style={{
            background: '#FFD1DC',
            color: '#FF6B8B',
            padding: '8px 16px',
            borderRadius: '99px',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: "'Quicksand', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 0px rgba(255,209,220,0.5)',
          }}>
            ⏱️ {recipe.cookTime || '30 mins'}
          </span>
          <span style={{
            background: '#FFFACD',
            color: '#4A3728',
            padding: '8px 16px',
            borderRadius: '99px',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: "'Quicksand', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 0px rgba(255,250,205,0.6)',
          }}>
            🌈 {servings} Tummies
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '44px',
          fontWeight: 700,
          color: '#1A120B',
          lineHeight: 1.15,
          marginBottom: '4px',
        }}>
          {recipe.title}
        </h1>

        {/* Sparkle decoration */}
        
        

        {/* Description */}
        <p style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '16px',
          color: '#6B4F3A',
          lineHeight: 1.65,
          marginBottom: '26px',
        }}>
          {recipe.description}
        </p>

        {/* Servings Slider */}
        <div style={{ marginBottom: '26px' }}>
          <ServingsSlider servings={servings} onChange={onServingsChange} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <button
            onClick={onStartCooking}
            style={{
              flex: 1,
              background: '#FF6B8B',
              color: '#ffffff',
              border: 'none',
              borderRadius: '99px',
              padding: '18px 28px',
              fontSize: '20px',
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 0px rgba(0,0,0,0.12)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
          >
            Let's Cook! 👩‍🍳
          </button>

          <button
            onClick={() => setLiked(!liked)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '3px solid #FFD1DC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 6px 0px rgba(0,0,0,0.08)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </section>
  );
}
