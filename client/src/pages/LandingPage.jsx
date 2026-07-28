import FloatingVegetables from '../components/FloatingVegetables';

export default function LandingPage({ ingredients, setIngredients, onGenerate, isLoading }) {
  const hasIngredients = ingredients.trim().length > 0;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5EFE6',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <FloatingVegetables />

      {/* ── Top Nav ── */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 48px',
      }}>
        <span style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '22px',
          fontWeight: 600,
          color: '#C1541A',
          letterSpacing: '0.5px',
        }}>
          ChefAI 👨‍🍳
        </span>
      </header>

      {/* ── Main Content ── */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 48px 48px',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        gap: '60px',
      }}>

        {/* Left Column */}
        <div style={{ flex: '1', minWidth: 0 }}>
          {/* Heading */}
          <h1 style={{
            fontFamily: "'Fredoka', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 700,
            color: '#1A120B',
            lineHeight: 1.15,
            marginBottom: '20px',
            letterSpacing: '-0.5px',
          }}>
            What can you cook today?
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '17px',
            color: '#6B4F3A',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Enter your ingredients and let AI create the perfect recipe.
          </p>

          {/* Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
          }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (hasIngredients && !isLoading) onGenerate();
              }}
            >
              {/* Textarea */}
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                disabled={isLoading}
                placeholder="e.g., 2 tomatoes, Paneer, Butter, Garlic, Rice, Onion..."
                rows={4}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.9)',
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  fontSize: '16px',
                  fontFamily: "'Quicksand', sans-serif",
                  color: '#1A120B',
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  display: 'block',
                  marginBottom: '20px',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#C1541A'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'}
              />

              {/* Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  disabled={!hasIngredients || isLoading}
                  style={{
                    background: hasIngredients && !isLoading ? '#D4622A' : '#D4622A99',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 36px',
                    fontSize: '16px',
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 700,
                    cursor: hasIngredients && !isLoading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    boxShadow: '0 4px 16px rgba(212,98,42,0.35)',
                  }}
                  onMouseEnter={e => { if (hasIngredients) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(212,98,42,0.45)'; }}}
                  onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 16px rgba(212,98,42,0.35)'; }}
                >
                  {isLoading ? 'Generating...' : 'Generate Recipe ✨'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column — Circular Image */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '10px solid #ffffff',
            boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
            flexShrink: 0,
          }}>
            <img
              src="/hero-food.png"
              alt="Delicious food"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#ffffff',
        padding: '28px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <span style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '26px',
          fontWeight: 700,
          color: '#C1541A',
        }}>
          ChefAI 👨‍🍳
        </span>
        <nav style={{ display: 'flex', gap: '32px' }}>
          {['Terms', 'Privacy', 'Recipes', 'About'].map(link => (
            <a key={link} href="#" style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              color: '#6B4F3A',
              textDecoration: 'none',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              {link}
            </a>
          ))}
        </nav>
        <span style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '12px',
          color: '#9C7E6A',
          letterSpacing: '0.5px',
        }}>
          © 2024 ChefAI Studio. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
