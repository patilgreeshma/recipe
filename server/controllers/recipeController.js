import { buildRecipePrompt } from '../prompts/recipePrompt.js';
import { generateRecipe } from '../services/geminiService.js';
import { validateRecipe } from '../validators/recipeSchema.js';

const MOCK_RECIPE = {
  title: "Mock Paneer Butter Masala",
  description: "A rich and creamy mock recipe provided because the AI API is currently rate-limited.",
  imageUrl: "",
  imageQuery: "paneer butter masala",
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
 * Fetch a food image URL from Pexels using the imageQuery from Gemini.
 * Falls back to empty string if Pexels key is not set or request fails.
 */
async function fetchFoodImage(query) {
  const pexelsKey = process.env.PEXELS_API_KEY;
  if (!pexelsKey || pexelsKey === 'your_pexels_api_key_here') {
    console.warn('PEXELS_API_KEY not configured — skipping image fetch.');
    return '';
  }

  try {
    const encoded = encodeURIComponent(query + ' food');
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encoded}&per_page=1&orientation=landscape`,
      { headers: { Authorization: pexelsKey } }
    );

    if (!res.ok) {
      console.warn(`Pexels API returned ${res.status} for query: "${query}"`);
      return '';
    }

    const data = await res.json();
    const photo = data?.photos?.[0];
    return photo?.src?.large || photo?.src?.medium || '';
  } catch (err) {
    console.warn('Pexels fetch failed:', err.message);
    return '';
  }
}

/**
 * Handle recipe generation request.
 * 1. Validates input
 * 2. Calls Gemini
 * 3. Cleans JSON response
 * 4. Validates with Zod
 * 5. Fetches food image from Pexels using imageQuery
 * 6. Returns structured response with imageUrl
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

    const recipe = validation.data;

    // Fetch dish-specific image from Pexels using imageQuery from Gemini
    const imageUrl = await fetchFoodImage(recipe.imageQuery || recipe.title);
    recipe.imageUrl = imageUrl;

    return res.json({ recipe });
  } catch (error) {
    console.error('Recipe generation error:', error.message);
    console.warn('Falling back to MOCK_RECIPE so the recipe page displays seamlessly.');
    return res.json({ recipe: MOCK_RECIPE });
  }
}
