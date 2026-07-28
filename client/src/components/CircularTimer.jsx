import { useEffect, useRef } from 'react';
import useTimer from '../hooks/useTimer';

/**
 * Large circular ring timer matching the reference design.
 * Orange ring on cream background, countdown in center, starts automatically.
 */
export default function CircularTimer({ duration, key: stepKey }) {
  const { secondsLeft, isActive, progress, toggle, reset, isComplete } = useTimer(duration);

  // Auto-start when step changes
  useEffect(() => {
    reset();
    // slight delay then start
    const t = setTimeout(() => toggle(), 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const size = 220;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* Background track */}
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="#FFFDF0"
            stroke="#F0EAD6"
            strokeWidth={strokeWidth}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isComplete ? '#7BC67E' : '#D4622A'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        {/* Center content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}>
          <span style={{ fontSize: '18px' }}>🕐</span>
          <span style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '44px',
            fontWeight: 700,
            color: '#4A3728',
            lineHeight: 1,
            letterSpacing: '2px',
          }}>
            {timeStr}
          </span>
          <span style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            color: '#9CA3AF',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            MINUTES
          </span>
        </div>
      </div>

      {/* Tap to pause/resume */}
      <button
        onClick={toggle}
        style={{
          marginTop: '12px',
          background: 'none',
          border: 'none',
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#9CA3AF',
          cursor: 'pointer',
          letterSpacing: '0.5px',
        }}
      >
        {isComplete ? '✅ Done!' : isActive ? 'Tap to pause' : 'Tap to resume'}
      </button>
    </div>
  );
}
