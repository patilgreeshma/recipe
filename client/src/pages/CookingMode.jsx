import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import FloatingVegetables from '../components/FloatingVegetables';
import useCookingMode from '../hooks/useCookingMode';
import CircularTimer from '../components/CircularTimer';

export default function CookingMode({ recipe, onExit, onFinish }) {
  const {
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
  } = useCookingMode(recipe.steps);

  const totalSteps = recipe.steps.length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FDF8F2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 24px 140px',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      <FloatingVegetables />

      {/* Exit button */}
      <button
        onClick={onExit}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          background: 'rgba(0,0,0,0.06)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF6B8B',
        }}
        aria-label="Exit cooking mode"
      >
        ✕
      </button>

      {/* ── Step Progress Dots ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '48px',
        marginBottom: '36px',
      }}>
        {recipe.steps.map((_, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              {idx > 0 && (
                <div style={{
                  width: '32px',
                  height: '2px',
                  background: isCompleted ? '#7BC67E' : '#E5E7EB',
                  transition: 'background 0.4s ease',
                }} />
              )}
              <div style={{
                width: isCurrent ? '42px' : '32px',
                height: isCurrent ? '42px' : '32px',
                borderRadius: '50%',
                background: isCompleted ? '#7BC67E' : isCurrent ? '#FF6B8B' : '#E5E7EB',
                color: isCompleted || isCurrent ? '#ffffff' : '#9CA3AF',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: isCurrent ? '18px' : '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isCurrent ? '0 4px 16px #FF6B8B' : 'none',
                transition: 'all 0.35s ease',
              }}>
                {isCompleted ? <FiCheck style={{ fontSize: '16px', strokeWidth: 3 }} /> : idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Animated Step Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '560px',
          }}
        >
          {/* Step Label */}
          <div style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#FF6B8B',
            background: '#FFF0E6',
            border: '1.5px solid #F5C9A8',
            borderRadius: '99px',
            padding: '5px 14px',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}>
            Step {currentStepIndex + 1} of {totalSteps}
          </div>

          {/* Step Title — dynamic from step number */}
          <h1 style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '40px',
            fontWeight: 700,
            color: '#FF6B8B',
            textAlign: 'center',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            Step {currentStepIndex + 1} 👨‍🍳
          </h1>

          {/* ── Instruction Card (big & prominent) ── */}
          <div style={{
            background: '#ffffff',
            border: '3px solid #FFFACD',
            borderRadius: '28px',
            padding: '32px 36px',
            boxShadow: '0 12px 0px rgba(255, 209, 220, 0.5), 0 16px 32px rgba(0,0,0,0.05)',
            width: '100%',
            marginBottom: '32px',
          }}>
            <p style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '22px',
              fontWeight: 600,
              color: '#38292cff',
              textAlign: 'center',
              lineHeight: 1.65,
              margin: 0,
            }}>
              {currentStep.instruction}
            </p>
          </div>

          {/* ── Circular Timer ── */}
          {currentStep.duration > 0 && (
            <CircularTimer key={currentStepIndex} duration={currentStep.duration} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom Navigation Buttons ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 32px 36px',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        background: 'linear-gradient(to top, #FDF8F2 75%, transparent)',
      }}>
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          style={{
            flex: 1,
            maxWidth: '200px',
            padding: '18px 24px',
            borderRadius: '99px',
            border: isFirstStep ? '2px solid #E5E7EB' : '2px solid #FF6B8B',
            background: '#ffffff',
            color: isFirstStep ? '#D1D5DB' : '#FF6B8B',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            cursor: isFirstStep ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          ← Previous
        </button>

        <button
          onClick={isLastStep ? onFinish : nextStep}
          style={{
            flex: 1,
            maxWidth: '200px',
            padding: '18px 24px',
            borderRadius: '99px',
            border: 'none',
            background: '#FF6B8B',
            color: '#ffffff',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 6px 0px #FF6B8B)',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
        >
          {isLastStep ? '✓ Finish' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
