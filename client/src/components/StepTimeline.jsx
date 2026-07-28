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
                  background: '#FFFACD',
                  color: '#4A3728',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
                  border: '4px solid #ffffff',
                }}>
                  {stepNum}
                </div>

                {/* Step Card */}
                <div style={{
                  flex: 1,
                  background: '#ffffff',
                  border: '3px solid #FFFACD',
                  borderRadius: '24px',
                  padding: '24px 28px',
                  boxShadow: '0 8px 0px rgba(255, 209, 220, 0.45), 0 12px 24px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                >
                  {/* Step Title */}
                  <h3 style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#4A3728',
                    marginBottom: '10px',
                    marginTop: 0,
                  }}>
                    Step {stepNum}: {stepTitle}
                  </h3>

                  {/* Step Instruction */}
                  <p style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '16px',
                    color: '#6B4F3A',
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
