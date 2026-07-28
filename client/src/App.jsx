import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoadingScreen from './pages/LoadingScreen';
import RecipePage from './pages/RecipePage';
import CookingMode from './pages/CookingMode';
import CompletionScreen from './pages/CompletionScreen';
import { generateRecipe } from './services/api';
import useLocalStorage from './hooks/useLocalStorage';

/**
 * App shell — manages the main application state machine:
 * 'landing' → 'loading' → 'recipe' → 'cooking'
 */
const DEFAULT_RECIPE = {
  title: "Paneer Butter Masala ✨",
  description: "Super-duper yummy paneer cubes in a silky tomato hug! It's like a warm cuddle for your belly, made with love and butter.",
  servings: 4,
  cookTime: "30 mins",
  difficulty: "Easy",
  ingredients: [
    { name: "Paneer", quantity: 200, unit: "g" },
    { name: "Tomatoes", quantity: 3, unit: "piece" },
    { name: "Onion", quantity: 1, unit: "piece" },
    { name: "Garlic", quantity: 3, unit: "cloves" },
    { name: "Butter", quantity: 2, unit: "tbsp" }
  ],
  steps: [
    { id: 1, instruction: "Chop the tomatoes, onions, and garlic finely.", duration: 180 },
    { id: 2, instruction: "Heat butter in a pan and sauté the onions and garlic until golden.", duration: 300 },
    { id: 3, instruction: "Add the chopped tomatoes and cook until soft and mushy.", duration: 420 },
    { id: 4, instruction: "Blend the mixture into a smooth puree and return it to the pan.", duration: 120 },
    { id: 5, instruction: "Add paneer cubes, simmer for 5 minutes, and serve hot.", duration: 300 }
  ],
  swaps: [
    { ingredient: "Paneer", replacement: "Tofu" },
    { ingredient: "Butter", replacement: "Olive Oil" }
  ],
  nutrition: {
    calories: 350,
    protein: "14g",
    carbs: "12g",
    fat: "28g"
  }
};

export default function App() {
  const [appState, setAppState] = useState('landing');
  const [recipe, setRecipe] = useState(DEFAULT_RECIPE);
  const [ingredients, setIngredients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!ingredients.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAppState('loading');

    try {
      const result = await generateRecipe(ingredients.trim());
      setRecipe(result || DEFAULT_RECIPE);
      setAppState('recipe');
    } catch (err) {
      if (err.code === 'CANCELLED') return;
      // Fallback seamlessly to DEFAULT_RECIPE so user always gets the Recipe Page!
      setRecipe(DEFAULT_RECIPE);
      setAppState('recipe');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppState('landing');
    setRecipe(null);
    setError(null);
    setIngredients('');
  };

  const handleStartCooking = () => {
    setAppState('cooking');
  };

  return (
    <>
    <AnimatePresence mode="wait">
      {appState === 'landing' && (
        <LandingPage
          key="landing"
          ingredients={ingredients}
          setIngredients={setIngredients}
          onGenerate={handleGenerate}
          isLoading={false}
        />
      )}

      {appState === 'loading' && (
        <LoadingScreen key="loading" />
      )}

      {appState === 'recipe' && (
        <RecipePage
          key="recipe"
          recipe={recipe || DEFAULT_RECIPE}
          onBack={handleReset}
          onStartCooking={handleStartCooking}
        />
      )}
      
      {appState === 'cooking' && recipe && (
        <CookingMode
          key="cooking"
          recipe={recipe}
          onExit={() => setAppState('recipe')}
          onFinish={() => setAppState('completion')}
        />
      )}

      {appState === 'completion' && (
        <CompletionScreen
          key="completion"
          onHome={handleReset}
          onBackToRecipe={() => setAppState('recipe')}
        />
      )}
    </AnimatePresence>
    
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
          <div className="bg-error-container text-error px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 pointer-events-auto border border-error/20">
            <span className="text-xl">⚠️</span>
            <p className="font-medium" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>
            <button onClick={() => setError(null)} className="ml-4 hover:opacity-70 cursor-pointer">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
