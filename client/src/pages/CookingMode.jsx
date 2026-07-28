import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import useCookingMode from '../hooks/useCookingMode';
import CookingProgress from '../components/CookingProgress';
import CircularTimer from '../components/CircularTimer';
import VoiceButton from '../components/VoiceButton';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export default function CookingMode({ recipe, onExit, onFinish }) {
  const {
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
  } = useCookingMode(recipe.steps);

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-cooking text-white flex flex-col relative overflow-hidden font-body">
      {/* Top Bar */}
      <header className="p-6 md:p-8 flex items-center justify-between z-10">
        <button
          onClick={onExit}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Exit cooking mode"
        >
          <FiX className="text-xl" />
        </button>
        <div
          className="text-lg md:text-xl font-bold truncate max-w-[200px] md:max-w-md"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {recipe.title}
        </div>
        <div className="w-12" /> {/* Spacer for centering */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col px-6 md:px-12 max-w-4xl mx-auto w-full justify-center pb-32">
        <CookingProgress currentStep={currentStepIndex} totalSteps={recipe.steps.length} />

        <div className="relative w-full mt-4 flex-grow flex flex-col justify-center">
          <AnimatePresence initial={false} custom={1} mode="wait">
            <motion.div
              key={currentStepIndex}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex flex-col justify-center w-full"
            >
              <div className="text-primary-fixed-dim text-lg md:text-xl font-medium mb-6 flex items-center gap-3 tracking-wide justify-between">
                <div className="flex items-center gap-3">
                  <span>Step {currentStep.id}</span>
                  {currentStep.duration > 0 && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim/50" />
                      <span className="flex items-center gap-1.5 text-white/70">
                        ⏱ {formatDuration(currentStep.duration)}
                      </span>
                    </>
                  )}
                </div>
                <VoiceButton text={currentStep.instruction} />
              </div>
              
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-10"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {currentStep.instruction}
              </h2>

              {currentStep.duration > 0 && (
                <div className="mt-4 flex justify-center">
                  <CircularTimer duration={currentStep.duration} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-[#1a1208] to-transparent z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={isFirstStep}
            className={`
              flex-1 md:flex-none md:w-48 py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-semibold
              transition-all duration-300
              ${isFirstStep
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 cursor-pointer'
              }
            `}
          >
            <FiChevronLeft className="text-xl" />
            <span>Previous</span>
          </button>

          <button
            onClick={isLastStep ? onFinish : nextStep}
            className="flex-[2] md:flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-semibold
                       bg-primary-container text-white glow-button cursor-pointer"
          >
            {isLastStep ? (
              <>
                <FiCheck className="text-xl" />
                <span>Finish Recipe</span>
              </>
            ) : (
              <>
                <span>Next Step</span>
                <FiChevronRight className="text-xl" />
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
