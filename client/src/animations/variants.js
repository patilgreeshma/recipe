/**
 * Reusable Framer Motion animation variants.
 * Used across all pages for consistent transitions.
 */

// Page-level transitions
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4,
};

// Staggered children container
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Individual stagger child
export const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

// Fade in from below with scale
export const fadeInUp = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

// Card hover lift
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

// Checkbox bounce
export const checkBounce = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 15 },
  },
};

// Scale in
export const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

// Slide in from left
export const slideInLeft = {
  initial: { x: -60, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

// Slide in from right
export const slideInRight = {
  initial: { x: 60, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

// Number counter animation helper
export const counterTransition = {
  duration: 1.5,
  ease: 'easeOut',
};
