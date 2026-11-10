import React from 'react';
import { MoodInfo } from '../types/music';
import { ChevronRight } from 'lucide-react';

interface MoodCardProps {
  mood: MoodInfo;
  isSelected?: boolean;
  onSelect: (mood: MoodInfo) => void;
}

export const MoodCard: React.FC<MoodCardProps> = ({
  mood,
  isSelected = false,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(mood)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
        isSelected
          ? 'border-white/80 bg-slate-800/90 shadow-2xl ring-2 ring-white/30'
          : `border-slate-800 bg-slate-900/60 hover:bg-slate-900/95 ${mood.borderClass}`
      }`}
    >
      {/* Background ambient glow on hover */}
      <div
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-70 ${mood.bgGlowClass}`}
      />

      {/* Top row: Emoji and indicator */}
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
          <span role="img" aria-label={mood.name}>
            {mood.emoji}
          </span>
        </div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors group-hover:${mood.textAccentClass} group-hover:bg-slate-800`}
        >
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-5 space-y-1">
        <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-white">
          {mood.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {mood.tagline}
        </p>
      </div>

      {/* Subtle bottom bar accent */}
      <div
        className="mt-4 h-0.5 w-full rounded-full opacity-30 transition-all duration-300 group-hover:opacity-100"
        style={{ backgroundColor: mood.accentHex }}
      />
    </button>
  );
};
