import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import useCookingMode from '../hooks/useCookingMode';
import CircularTimer from '../components/CircularTimer';

const STEP_TITLES = [
  'Get Ready! 🎒',
  'Sizzle Time! 🔥',
  'Make it Saucy 🥣',
  'Simmer & Smile ✨',
  'Plating Paradise 🍽️',
  'Feast Time! 🎉',
];

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
  const stepTitle = STEP_TITLES[currentStepIndex] || `Step ${currentStepIndex + 1}`;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FDF8F2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 24px 120px',
      position: 'relative',
    }}>

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
          color: '#6B4F3A',
        }}
        aria-label="Exit cooking mode"
      >
        ✕
      </button>

      {/* ── Step Progress Dots ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
        marginTop: '48px',
        marginBottom: '36px',
      }}>
        {recipe.steps.map((_, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Connector line before (except first) */}
              {idx > 0 && (
                <div style={{
                  width: '32px',
                  height: '2px',
                  background: isCompleted ? '#7BC67E' : '#E5E7EB',
                }} />
              )}
              {/* Dot */}
              <div style={{
                width: isCurrent ? '40px' : '32px',
                height: isCurrent ? '40px' : '32px',
                borderRadius: '50%',
                background: isCompleted ? '#7BC67E' : isCurrent ? '#D4622A' : '#E5E7EB',
                color: isCompleted || isCurrent ? '#ffffff' : '#9CA3AF',
                fontFamily: "'Fredoka', sans-serif",
                fontSize: isCurrent ? '18px' : '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isCurrent ? '0 4px 16px rgba(212, 98, 42, 0.4)' : 'none',
                transition: 'all 0.3s ease',
              }}>
                {isCompleted ? <FiCheck style={{ fontSize: '16px', strokeWidth: 3 }} /> : idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Step Label ── */}
      <div style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '2px',
        color: '#D4622A',
        background: '#FFF0E6',
        border: '1.5px solid #F5C9A8',
        borderRadius: '99px',
        padding: '5px 14px',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>
        Step {currentStepIndex + 1} of {totalSteps}
      </div>

      {/* ── Step Title ── */}
      <h1 style={{
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '36px',
        fontWeight: 700,
        color: '#D4622A',
        textAlign: 'center',
        marginBottom: '12px',
        lineHeight: 1.2,
      }}>
        {stepTitle}
      </h1>

      {/* ── Step Instruction ── */}
      <p style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '16px',
        color: '#6B4F3A',
        textAlign: 'center',
        lineHeight: 1.6,
        maxWidth: '420px',
        marginBottom: '32px',
      }}>
        {currentStep.instruction}
      </p>

      {/* ── Circular Timer ── */}
      {currentStep.duration > 0 && (
        <CircularTimer key={currentStepIndex} duration={currentStep.duration} />
      )}

      {/* ── Bottom Navigation Buttons ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 32px 32px',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        background: 'linear-gradient(to top, #FDF8F2 70%, transparent)',
      }}>
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          style={{
            flex: 1,
            maxWidth: '180px',
            padding: '16px 24px',
            borderRadius: '99px',
            border: isFirstStep ? '2px solid #E5E7EB' : '2px solid #D4622A',
            background: '#ffffff',
            color: isFirstStep ? '#D1D5DB' : '#D4622A',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '17px',
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
            maxWidth: '180px',
            padding: '16px 24px',
            borderRadius: '99px',
            border: 'none',
            background: '#D4622A',
            color: '#ffffff',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 6px 0px rgba(180, 80, 20, 0.3)',
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
