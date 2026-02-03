"use client";

import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  duration: string;
  isPlaying: boolean;
  onToggle: () => void;
}

/**
 * Reusable audio player component for playing song previews.
 * Provides play/pause functionality with a progress bar.
 */
export function AudioPlayer({ duration, isPlaying, onToggle }: AudioPlayerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            onToggle();
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    } else {
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [isPlaying, onToggle]);

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-brand-cream-dark rounded-full">
      <button
        onClick={onToggle}
        className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white hover:bg-brand-gold-light transition-colors shrink-0"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-brand-mocha">{duration}</span>
        </div>
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-gold rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}



