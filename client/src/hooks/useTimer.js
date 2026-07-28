import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to manage countdown timer.
 */
export default function useTimer(initialSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Update when initialSeconds changes (e.g. moving to a new step)
  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            // Could play sound here
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, secondsLeft]);

  const toggle = useCallback(() => {
    if (secondsLeft > 0) setIsActive(!isActive);
  }, [isActive, secondsLeft]);

  const reset = useCallback(() => {
    setIsActive(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const addTime = useCallback((seconds) => {
    setSecondsLeft((prev) => prev + seconds);
  }, []);

  return {
    secondsLeft,
    isActive,
    isComplete: secondsLeft === 0 && initialSeconds > 0,
    toggle,
    reset,
    addTime,
    progress: initialSeconds > 0 ? ((initialSeconds - secondsLeft) / initialSeconds) * 100 : 0,
  };
}
