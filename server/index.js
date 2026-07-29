import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import recipeRoutes from './routes/recipeRoutes.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// In production, serve the built React client from ../client/dist
const clientDist = join(__dirname, '..', 'client', 'dist');

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Recipe API
app.use('/api', recipeRoutes);

// Serve static React files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDist));

  // SPA fallback — all non-API routes serve index.html
  app.get('*', (req, res) => {
    res.sendFile(join(clientDist, 'index.html'));
  });
}

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
