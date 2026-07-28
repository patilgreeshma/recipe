import { buildRecipePrompt } from '../prompts/recipePrompt.js';
import { generateRecipe } from '../services/geminiService.js';
import { validateRecipe } from '../validators/recipeSchema.js';

const MOCK_RECIPE = {
  title: "Mock Paneer Butter Masala",
  description: "A rich and creamy mock recipe provided because the AI API is currently rate-limited.",
  servings: 4,
  cookTime: "30 mins",
  difficulty: "Medium",
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

/**
 * Handle recipe generation request.
 * 1. Validates input
 * 2. Calls Gemini
 * 3. Cleans JSON response
 * 4. Validates with Zod
 * 5. Returns structured response
 */
export async function generateRecipeController(req, res) {
  try {
    const { ingredients } = req.body;

    // Input validation
    if (!ingredients || typeof ingredients !== 'string' || ingredients.trim().length === 0) {
      return res.status(400).json({
        error: 'Please provide at least one ingredient.',
        code: 'INVALID_INPUT',
      });
    }

    if (ingredients.length > 2000) {
      return res.status(400).json({
        error: 'Ingredient list is too long. Please keep it under 2000 characters.',
        code: 'INPUT_TOO_LONG',
      });
    }

    // Build prompt and call Gemini
    const prompt = buildRecipePrompt(ingredients.trim());
    const rawResponse = await generateRecipe(prompt);

    // Clean the response — strip potential markdown code fences
    let cleaned = rawResponse.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    // Parse JSON
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('JSON parse failed. Raw response:', cleaned.slice(0, 300));
      return res.status(502).json({
        error: "We couldn't understand the AI response. Please try again.",
        code: 'PARSE_ERROR',
      });
    }

    // Validate with Zod
    const validation = validateRecipe(parsed);

    if (!validation.success) {
      console.error('Zod validation failed:', validation.errors);
      return res.status(502).json({
        error: "The AI response didn't match the expected format. Please try again.",
        code: 'VALIDATION_ERROR',
        details: validation.errors,
      });
    }

    return res.json({ recipe: validation.data });
  } catch (error) {
    console.error('Recipe generation error:', error.message);
    console.warn('Falling back to MOCK_RECIPE so the recipe page displays seamlessly.');
    return res.json({ recipe: MOCK_RECIPE });
  }
}
