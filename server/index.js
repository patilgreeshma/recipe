import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Recipe API
app.use('/api', recipeRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'An unexpected error occurred.',
    code: 'INTERNAL_ERROR',
  });
});

app.listen(PORT, () => {
  console.log(`🍳 ChefAI server running on http://localhost:${PORT}`);
});
