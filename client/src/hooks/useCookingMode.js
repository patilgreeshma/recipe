import { useState, useCallback } from 'react';

/**
 * Custom hook to manage cooking mode state.
 * Handles step navigation and progress tracking.
 */
export default function useCookingMode(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  }, [steps.length]);

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    nextStep,
    prevStep,
    goToStep,
  };
}
