import { useState, useCallback } from 'react';
import FloatingVegetables from '../components/FloatingVegetables';
import RecipeHeader from '../components/RecipeHeader';
import NutritionPanel from '../components/NutritionPanel';
import IngredientList from '../components/IngredientList';
import IngredientSwaps from '../components/IngredientSwaps';

export default function RecipePage({ recipe, onBack, onStartCooking }) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleToggleIngredient = useCallback((index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFDF0',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: '80px',
    }}>
      <FloatingVegetables />

      {/* Back button */}
      <div style={{ position: 'relative', zIndex: 10, padding: '24px 40px 0', maxWidth: '1180px', margin: '0 auto' }}>
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
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
        >
          ← Go Back
        </button>
      </div>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Section 1: Hero Header */}
        <RecipeHeader recipe={recipe} onStartCooking={onStartCooking} />

        {/* Section 2: Nutrition Panel (Good Stuff Inside 🍎) */}
        <NutritionPanel nutrition={recipe.nutrition} />

        {/* Section 3: Ingredients Checklist & Fun Swaps */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          <IngredientList
            ingredients={recipe.ingredients}
            checkedItems={checkedItems}
            onToggle={handleToggleIngredient}
          />

          <IngredientSwaps swaps={recipe.swaps} />
        </section>
      </main>
    </div>
  );
}
