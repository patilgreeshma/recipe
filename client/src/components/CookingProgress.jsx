import { motion } from 'framer-motion';

/**
 * Top progress bar for cooking mode.
 * Shows step X of Y and a progress fill.
 */
export default function CookingProgress({ currentStep, totalSteps }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-3">
        <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
          Cooking Progress
        </span>
        <span className="text-white font-bold">
          {currentStep + 1} <span className="text-white/40">/ {totalSteps}</span>
        </span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          className="h-full bg-primary-container rounded-full"
        />
      </div>
    </div>
  );
}
