import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { pageVariants, pageTransition } from '../animations/variants';

const MESSAGES = [
  "Chopping vegetables...",
  "Preheating the oven...",
  "Consulting the AI chef...",
  "Adding a pinch of salt...",
  "Stirring the pot...",
  "Plating the dish..."
];

/**
 * Loading screen shown while Gemini is generating the recipe.
 * Features an animated double spinner and cycling text messages.
 */
export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-gradient-cream min-h-screen flex flex-col items-center justify-center relative px-6 text-center"
    >
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border-4 border-primary-container/30 border-t-primary-container rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 border-4 border-tertiary/20 border-b-tertiary rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          👨‍🍳
        </div>
      </div>

      <div className="h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl font-bold text-on-surface"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {MESSAGES[messageIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>
      
      <p className="mt-4 text-sm text-on-surface-variant max-w-xs">
        This usually takes 5-10 seconds while our AI writes a custom recipe just for you.
      </p>
    </motion.div>
  );
}
