import { z } from 'zod';

/**
 * Zod schema for validating Gemini's recipe JSON response.
 * Uses .passthrough() on the top level so extra fields don't cause failures,
 * but enforces all required fields with sensible defaults via .default().
 */

const ingredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().default(1),
  unit: z.string().default('piece'),
});

const stepSchema = z.object({
  id: z.number(),
  instruction: z.string().min(1),
  duration: z.number().min(0).default(60), // seconds
});

const swapSchema = z.object({
  ingredient: z.string().min(1),
  replacement: z.string().min(1),
});

const nutritionSchema = z.object({
  calories: z.number().default(0),
  protein: z.string().default('0g'),
  carbs: z.string().default('0g'),
  fat: z.string().default('0g'),
});

export const recipeSchema = z.object({
  title: z.string().min(1, 'Recipe must have a title'),
  description: z.string().default('A delicious recipe'),
  imageQuery: z.string().optional().default(''),
  imageUrl: z.string().optional().default(''),
  servings: z.number().min(1).max(20).default(2),
  cookTime: z.string().default('30 mins'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium'),
  ingredients: z.array(ingredientSchema).min(1, 'Recipe must have at least one ingredient'),
  steps: z.array(stepSchema).min(1, 'Recipe must have at least one step'),
  swaps: z.array(swapSchema).default([]),
  nutrition: nutritionSchema.default({
    calories: 0,
    protein: '0g',
    carbs: '0g',
    fat: '0g',
  }),
}).passthrough();


/**
 * Validate a parsed recipe object against the Zod schema.
 * Returns { success: true, data } or { success: false, errors }.
 */
export function validateRecipe(data) {
  const result = recipeSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  console.error('Recipe validation failed:', errors);
  return { success: false, errors };
}
