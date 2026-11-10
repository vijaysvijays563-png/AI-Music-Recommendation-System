import React from 'react';
import { MoodInfo } from '../types/music';

interface LoadingVibeProps {
  mood: MoodInfo;
}

export const LoadingVibe: React.FC<LoadingVibeProps> = ({ mood }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Animated Soundwave / Vinyl visualizer */}
      <div className="relative flex items-center justify-center">
        {/* Glow */}
        <div
          className="absolute -inset-4 rounded-full blur-2xl opacity-40 animate-pulse"
          style={{ backgroundColor: mood.accentHex }}
        />

        {/* Central Mood Emoji pulsing */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-slate-900 shadow-2xl animate-bounce">
          <span className="text-4xl" role="img" aria-label={mood.name}>
            {mood.emoji}
          </span>
        </div>
      </div>

      {/* Animated Equalizer Bars */}
      <div className="mt-8 flex items-end justify-center gap-1.5 h-8">
        {[40, 75, 55, 95, 60, 85, 45, 90, 65, 80].map((height, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: mood.accentHex,
              height: `${height}%`,
              animation: `pulse-subtle ${0.6 + (i % 4) * 0.2}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
        Curating songs for your <span style={{ color: mood.accentHex }}>{mood.name}</span> mood...
      </h3>
      <p className="mt-2 text-sm text-slate-400 max-w-sm">
        Matching sound frequencies, tempo, and lyrical warmth to match how you feel.
      </p>
    </div>
  );
};
