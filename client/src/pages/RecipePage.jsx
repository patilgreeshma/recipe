import FloatingVegetables from '../components/FloatingVegetables';
import RecipeHeader from '../components/RecipeHeader';

export default function RecipePage({ recipe, onBack, onStartCooking }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFDF0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <FloatingVegetables />

      {/* Back button */}
      <div style={{ position: 'relative', zIndex: 10, padding: '24px 40px 0' }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '2px solid #FFFACD',
            borderRadius: '99px',
            padding: '10px 22px',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '15px',
            fontWeight: 700,
            color: '#6B4F3A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Go Back
        </button>
      </div>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <RecipeHeader recipe={recipe} onStartCooking={onStartCooking} />
      </main>
    </div>
  );
}
