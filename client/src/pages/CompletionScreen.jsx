import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { FiHome, FiCheck } from 'react-icons/fi';
import { pageVariants, pageTransition, staggerContainer, staggerItem } from '../animations/variants';

/**
 * Celebration screen shown when the user finishes cooking a recipe.
 * Includes confetti animation and a prompt to return home.
 */
export default function CompletionScreen({ onHome }) {
  const { width, height } = useWindowSize();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-gradient-cream min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={400}
        gravity={0.15}
        colors={['#e87b35', '#9b4500', '#006684', '#4A7C59', '#ffdbc9']}
      />

      <motion.main
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center"
      >
        <motion.div
          variants={staggerItem}
          className="w-24 h-24 bg-success/20 text-success rounded-full flex items-center justify-center mb-8"
        >
          <FiCheck className="text-5xl" strokeWidth={3} />
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="text-4xl md:text-5xl font-bold mb-4 text-on-surface"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
        >
          Bon Appétit!
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-lg text-on-surface-variant mb-12"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          You've successfully completed the recipe. Enjoy your meal!
        </motion.p>

        <motion.div variants={staggerItem}>
          <button
            onClick={onHome}
            className="bg-primary-container text-white px-10 py-4 rounded-xl glow-button
                       flex items-center gap-3 font-semibold tracking-wide cursor-pointer uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <FiHome className="text-xl" />
            <span>Cook Something Else</span>
          </button>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
