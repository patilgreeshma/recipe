import { Router } from 'express';
import { generateRecipeController } from '../controllers/recipeController.js';

const router = Router();

router.post('/generate-recipe', generateRecipeController);

export default router;
