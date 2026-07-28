export default function IngredientSwaps({ swaps }) {
  const swapList = swaps && swaps.length > 0 ? swaps : [
    { ingredient: 'Paneer', replacement: 'Tofu' }
  ];

  const primarySwap = swapList[0];

  return (
    <div style={{ flex: 1 }}>
      {/* Header */}
      <h2 style={{
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '32px',
        fontWeight: 700,
        color: '#4A3728',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        Fun Swaps 🔄
      </h2>

      {/* Main swap card */}
      <div style={{
        background: '#FAF8EE',
        border: '4px solid #FFFACD',
        borderRadius: '28px',
        height: '340px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 0px rgba(255, 209, 220, 0.45), 0 16px 32px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
      }}>
        {/* Large Salad Illustration/Emoji */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          fontSize: '96px',
          userSelect: 'none',
        }}>
          🥗
        </div>

        {/* Floating Tofu Surprise card at bottom */}
        <div style={{
          background: '#ffffff',
          border: '3px solid #7BC67E',
          borderRadius: '22px',
          padding: '20px 24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '22px',
            fontWeight: 700,
            color: '#1A120B',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            {primarySwap.replacement} Surprise! 🧊
          </h3>
          <p style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '15px',
            color: '#6B4F3A',
            lineHeight: 1.5,
            margin: 0,
          }}>
            Swap {primarySwap.ingredient.toLowerCase()} for {primarySwap.replacement.toLowerCase()} to make it super plant-powered! It's just as bouncy and fun to eat.
          </p>
        </div>
      </div>
    </div>
  );
}
