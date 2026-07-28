import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';
import useTimer from '../hooks/useTimer';

/**
 * Circular countdown timer for cooking steps.
 * Shows animated SVG ring and play/pause controls.
 */
export default function CircularTimer({ duration, onComplete }) {
  const { secondsLeft, isActive, progress, toggle, reset, isComplete } = useTimer(duration);

  useEffect(() => {
    if (isComplete) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.5);
        }
      } catch (e) {
        // Ignore audio errors
      }
      if (onComplete) onComplete();
    }
  }, [isComplete, onComplete]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  const radius = 45;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (duration <= 0) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="rgba(255,255,255,0.1)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle */}
          <motion.circle
            stroke="var(--color-primary-container)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </svg>

        {/* Time Text */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-white">
            {timeStr}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={toggle}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
          aria-label={isActive ? "Pause timer" : "Start timer"}
        >
          {isActive ? <FiPause className="text-xl" /> : <FiPlay className="text-xl ml-1" />}
        </button>
        <button
          onClick={reset}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
          aria-label="Reset timer"
        >
          <FiRotateCcw className="text-xl" />
        </button>
      </div>
    </div>
  );
}
