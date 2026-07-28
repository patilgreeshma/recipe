import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

/**
 * Celebration screen shown when the user finishes cooking a recipe.
 * Includes confetti animation and buttons to go back to recipe or start fresh.
 */
export default function CompletionScreen({ onHome, onBackToRecipe }) {
  const { width, height } = useWindowSize();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFDF0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '24px',
    }}>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={400}
        gravity={0.12}
        colors={['#FF6B8B', '#D4622A', '#7BC67E', '#FFD700', '#B2FBA5', '#FFD1DC']}
      />

      <main style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '480px',
        width: '100%',
      }}>
        {/* Big celebration emoji */}
        <div style={{ fontSize: '80px', marginBottom: '24px', lineHeight: 1 }}>
          🎉
        </div>

        {/* Green checkmark circle */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#E2FBE2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          marginBottom: '24px',
          boxShadow: '0 8px 0px rgba(123, 198, 126, 0.35)',
        }}>
          ✅
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '52px',
          fontWeight: 700,
          color: '#1A120B',
          marginBottom: '12px',
          lineHeight: 1.1,
        }}>
          Bon Appétit!
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '18px',
          color: '#6B4F3A',
          lineHeight: 1.6,
          marginBottom: '48px',
        }}>
          You've successfully completed the recipe. Enjoy your meal! 🍽️
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
        }}>
          {/* Back to Recipe */}
          <button
            onClick={onBackToRecipe}
            style={{
              width: '100%',
              padding: '18px 28px',
              borderRadius: '99px',
              border: '3px solid #D4622A',
              background: '#ffffff',
              color: '#D4622A',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '20px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 0px rgba(212, 98, 42, 0.2)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
          >
            📋 Back to Recipe
          </button>

          {/* Cook Something Else */}
          <button
            onClick={onHome}
            style={{
              width: '100%',
              padding: '18px 28px',
              borderRadius: '99px',
              border: 'none',
              background: '#D4622A',
              color: '#ffffff',
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '20px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 0px rgba(180, 80, 20, 0.35)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
          >
            🏠 Cook Something Else
          </button>
        </div>
      </main>
    </div>
  );
}
