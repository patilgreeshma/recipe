import { FiCheck } from 'react-icons/fi';

const STEP_TITLES = [
  'Get Ready! 🎒',
  'Sizzle Time! 🔥',
  'Make it Saucy 🥣',
  'Simmer & Smile ✨',
  'Plating Paradise 🍽️',
  'Feast Time! 🎉',
];

export default function StepTimeline({ steps }) {
  const stepList = steps && steps.length > 0 ? steps : [
    { id: 1, instruction: "Chop-chop the onions and make the tomatoes all squishy. Soak the cashews like they're in a bath!" },
    { id: 2, instruction: "Melt the butter and make the onions dance in the pan until they're golden like treasure. Add the magic ginger-garlic smell!" },
    { id: 3, instruction: "Pour in the tomato soup and cashew cream. Let it bubble-bubble until it looks super-duper yummy." },
  ];

  return (
    <section style={{
      maxWidth: '1000px',
      margin: '60px auto 0 auto',
      padding: '0 40px',
    }}>
      {/* Title */}
      <h2 style={{
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '36px',
        fontWeight: 700,
        color: '#4A3728',
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        How to Make Magic ✨
      </h2>

      {/* Timeline List */}
      <div style={{ position: 'relative', paddingLeft: '32px' }}>
        {/* Continuous yellow vertical connector line */}
        <div style={{
          position: 'absolute',
          top: '24px',
          bottom: '24px',
          left: '55px',
          width: '6px',
          background: '#FFFACD',
          borderRadius: '3px',
          zIndex: 1,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {stepList.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = idx === 0;
            const isCurrent = idx === 1; // Step 2 highlighted like in the design

            const stepTitle = STEP_TITLES[idx] || `Step ${stepNum}`;

            return (
              <div
                key={step.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '24px',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Marker Badge */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: isCompleted ? '#7BC67E' : isCurrent ? '#FF6B8B' : '#FFFACD',
                  color: isCompleted || isCurrent ? '#ffffff' : '#4A3728',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isCurrent ? '0 6px 16px rgba(255, 107, 139, 0.4)' : '0 4px 8px rgba(0,0,0,0.06)',
                  border: '4px solid #ffffff',
                }}>
                  {isCompleted ? <FiCheck style={{ fontSize: '22px', strokeWidth: 3 }} /> : stepNum}
                </div>

                {/* Step Card */}
                <div style={{
                  flex: 1,
                  background: isCompleted ? '#F2FCF2' : '#ffffff',
                  border: isCompleted
                    ? '3px solid #B2FBA5'
                    : isCurrent
                    ? '4px solid #FF6B8B'
                    : '3px solid #FFFACD',
                  borderRadius: '24px',
                  padding: isCurrent ? '28px 32px' : '24px 28px',
                  boxShadow: isCurrent
                    ? '0 12px 28px rgba(255, 107, 139, 0.2), 0 8px 0px rgba(255, 209, 220, 0.5)'
                    : isCompleted
                    ? '0 6px 0px rgba(178, 251, 165, 0.3)'
                    : '0 8px 0px rgba(255, 209, 220, 0.4)',
                  transition: 'transform 0.2s ease',
                }}>
                  {/* Step Title */}
                  <h3 style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    color: isCompleted ? '#9CA3AF' : isCurrent ? '#FF6B8B' : '#4A3728',
                    textDecoration: isCompleted ? 'line-through' : 'none',
                    marginBottom: '10px',
                    marginTtop: 0,
                  }}>
                    Step {stepNum}: {stepTitle}
                  </h3>

                  {/* Step Instruction */}
                  <p style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '16px',
                    color: isCompleted ? '#9CA3AF' : '#6B4F3A',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {step.instruction}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
