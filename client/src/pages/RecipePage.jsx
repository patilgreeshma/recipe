import { useState, useCallback } from 'react';
import FloatingVegetables from '../components/FloatingVegetables';
import RecipeHeader from '../components/RecipeHeader';
import NutritionPanel from '../components/NutritionPanel';
import IngredientList from '../components/IngredientList';
import IngredientSwaps from '../components/IngredientSwaps';
import StepTimeline from '../components/StepTimeline';

export default function RecipePage({ recipe, onBack, onStartCooking }) {
  const [checkedItems, setCheckedItems] = useState({});
  // servings state lives here so it can drive both ingredients + nutrition
  const [servings, setServings] = useState(recipe.servings || 2);

  const handleToggleIngredient = useCallback((index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  // ratio of current servings to the original recipe servings
  const scale = servings / (recipe.servings || 2);

  // Scale ingredient quantities
  const scaledIngredients = (recipe.ingredients || []).map((ing) => ({
    ...ing,
    quantity: parseFloat((ing.quantity * scale).toFixed(2)),
  }));

  // Scale nutrition values (parse numbers from strings like "18g")
  const scaleNutrition = (value, ratio) => {
    if (value === undefined || value === null) return value;
    const num = parseFloat(String(value));
    if (isNaN(num)) return value;
    const scaled = num * ratio;
    // If original value had a unit suffix like "g", keep it
    const suffix = String(value).replace(/[0-9.]/g, '').trim();
    return suffix
      ? `${Math.round(scaled)}${suffix}`
      : Math.round(scaled);
  };

  const scaledNutrition = {
    calories: scaleNutrition(recipe.nutrition?.calories, scale),
    protein: scaleNutrition(recipe.nutrition?.protein, scale),
    carbs: scaleNutrition(recipe.nutrition?.carbs, scale),
    fat: scaleNutrition(recipe.nutrition?.fat, scale),
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFDF0',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: '100px',
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
        {/* Section 1: Hero Header — passes servings state down */}
        <RecipeHeader
          recipe={recipe}
          onStartCooking={onStartCooking}
          servings={servings}
          onServingsChange={setServings}
        />

        {/* Section 2: Nutrition Panel — receives scaled values */}
        <NutritionPanel nutrition={scaledNutrition} servings={servings} />

        {/* Section 3: Ingredients Checklist & Fun Swaps — scaled quantities */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto 60px auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          <IngredientList
            ingredients={scaledIngredients}
            checkedItems={checkedItems}
            onToggle={handleToggleIngredient}
          />

          <IngredientSwaps swaps={recipe.swaps} />
        </section>

        {/* Section 4: Steps Timeline */}
        <StepTimeline steps={recipe.steps} />
      </main>
    </div>
  );
}
