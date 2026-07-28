import { motion } from 'framer-motion';

const VEGETABLES = [
  { emoji: '🥕', className: 'top-[10%] left-[15%]', animation: 'animate-float-1' },
  { emoji: '🍅', className: 'top-[30%] right-[20%]', animation: 'animate-float-2' },
  { emoji: '🧅', className: 'bottom-[20%] left-[25%]', animation: 'animate-float-3' },
  { emoji: '🥬', className: 'top-[60%] left-[10%]', animation: 'animate-float-4' },
  { emoji: '🍳', className: 'bottom-[10%] right-[15%]', animation: 'animate-float-5' },
  { emoji: '🌶️', className: 'top-[15%] right-[10%]', animation: 'animate-float-1', delay: 2 },
  { emoji: '🥑', className: 'bottom-[40%] right-[5%]', animation: 'animate-float-2', delay: 3 },
  { emoji: '🧄', className: 'top-[75%] left-[40%]', animation: 'animate-float-3', delay: 1 },
  { emoji: '🍋', className: 'top-[5%] left-[50%]', animation: 'animate-float-4', delay: 4 },
  { emoji: '🫑', className: 'bottom-[5%] left-[60%]', animation: 'animate-float-5', delay: 2 },
];

/**
 * Floating vegetable emojis for ambient background animation.
 * Each emoji follows a unique float path defined in index.css.
 */
export default function FloatingVegetables() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {VEGETABLES.map((veg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
          className={`absolute ${veg.className} ${veg.animation} text-5xl select-none`}
          style={veg.delay ? { animationDelay: `${veg.delay}s` } : undefined}
        >
          {veg.emoji}
        </motion.div>
      ))}
    </div>
  );
}
