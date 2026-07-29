/**
 * Structured prompt for Gemini API.
 * Enforces strict JSON output with no markdown or explanation.
 */
export function buildRecipePrompt(ingredients) {
  return `You are a professional chef and recipe creator. Given a list of ingredients, create a delicious recipe.

CRITICAL INSTRUCTIONS:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- No code fences.
- No text before or after the JSON.
- Follow EXACTLY this schema.

The JSON schema:
{
  "title": "string - creative recipe name",
  "description": "string - 1-2 sentence appetizing description",
  "imageQuery": "string - 2-4 word food photography search query for this specific dish, e.g. 'paneer butter masala' or 'spaghetti carbonara'",
  "servings": number,
  "cookTime": "string - e.g. '25 mins'",
  "difficulty": "string - one of: Easy, Medium, Hard",
  "ingredients": [
    {
      "name": "string",
      "quantity": number,
      "unit": "string - e.g. cup, tbsp, piece, g, ml"
    }
  ],
  "steps": [
    {
      "id": number,
      "instruction": "string - clear cooking instruction",
      "duration": number (ALWAYS in seconds)
    }
  ],
  "swaps": [
    {
      "ingredient": "string - original ingredient",
      "replacement": "string - healthy or common alternative"
    }
  ],
  "nutrition": {
    "calories": number,
    "protein": "string - e.g. '18g'",
    "carbs": "string - e.g. '55g'",
    "fat": "string - e.g. '12g'"
  }
}

RULES:
- Include ALL provided ingredients in the recipe.
- Add common pantry staples if needed (salt, pepper, oil, water).
- Provide 5-10 cooking steps.
- Each step duration MUST be in seconds (e.g., 180 for 3 minutes).
- Include 2-4 ingredient swaps.
- Make the recipe practical and delicious.
- Difficulty should match the complexity of the recipe.
- imageQuery must be the dish name only, suitable for image search (e.g. "dal makhani", "pasta primavera").

USER'S INGREDIENTS:
${ingredients}

Return ONLY the JSON object. Nothing else.`;
}
