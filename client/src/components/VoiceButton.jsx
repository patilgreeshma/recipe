import { useState, useEffect } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

/**
 * VoiceButton component uses Web Speech API to read instructions aloud.
 * Automatically stops if the text changes (e.g. user goes to next step).
 */
export default function VoiceButton({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  // Stop playing when text changes
  useEffect(() => {
    if (isPlaying && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const toggleVoice = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for better comprehension
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) return null;

  return (
    <button
      onClick={toggleVoice}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer
        ${isPlaying ? 'bg-primary-container text-white shadow-lg shadow-primary-container/30' : 'bg-white/10 text-white/70 hover:bg-white/20'}
      `}
      aria-label={isPlaying ? "Stop reading" : "Read step aloud"}
    >
      {isPlaying ? <FiVolumeX className="text-lg" /> : <FiVolume2 className="text-lg" />}
    </button>
  );
}
