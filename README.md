# ChefAI – Fridge to Recipe 👨‍🍳

A production-quality AI-powered React application that transforms a list of ingredients into interactive, step-by-step cooking experiences.

## ✨ Features

- **AI Recipe Generation**: Powered by Google Gemini 2.0 Flash for structured, creative recipes.
- **Immersive Cooking Mode**: Distraction-free, dark-themed UI specifically designed for use while cooking.
- **Voice Instructions**: Integrated Web Speech API to read steps aloud.
- **Smart Timers**: Interactive SVG circular timers with audio beep notifications.
- **Dynamic Servings Slider**: Automatically scales ingredient quantities up or down.
- **Healthy Swaps**: Interactive 3D flip cards for ingredient alternatives.
- **Resilient State**: Auto-saves your active recipe and app state using localStorage.
- **Premium Animations**: Powered by Framer Motion (page transitions, micro-interactions, confetti).
- **Stitch Design System**: Custom glassmorphism aesthetic built with TailwindCSS v4.

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS v4, Framer Motion, React Icons
- **Backend**: Express.js, Google Generative AI SDK, Zod Validation
- **Architecture**: Client-Server hybrid (API key stays securely on the backend)

## 🚀 Getting Started

1. **Install Dependencies** (from the root folder):
   ```bash
   npm run install:all
   ```

2. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   *Open `.env` and add your [Google AI Studio API Key](https://aistudio.google.com/).*

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *This uses `concurrently` to start both the Vite frontend (port 5173) and the Express backend (port 3001).*

## 🔒 Security Note
The Gemini API key is intentionally kept strictly on the Express backend. The React client only communicates with our own local `/api/generate-recipe` endpoint. This prevents API key leakage in production builds.
