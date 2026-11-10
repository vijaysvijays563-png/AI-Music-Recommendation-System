import React from 'react';
import { Sparkles, Music2, Heart, BookOpen } from 'lucide-react';

interface HeaderProps {
  onSurpriseMe: () => void;
  onOpenFavorites: () => void;
  onOpenProjectInfo: () => void;
  onGoHome: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSurpriseMe,
  onOpenFavorites,
  onOpenProjectInfo,
  onGoHome,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={onGoHome}
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20">
            <Music2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif] whitespace-nowrap">
            Moodify
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={onGoHome}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Moods
          </button>
          <button
            onClick={onOpenFavorites}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            <Heart className="h-4 w-4 text-rose-400" />
            <span>Saved Favorites</span>
            {favoritesCount > 0 && (
              <span className="text-xs text-rose-400 tabular-nums">
                ({favoritesCount})
              </span>
            )}
          </button>
          <button
            onClick={onOpenProjectInfo}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            <BookOpen className="h-4 w-4 text-sky-400" />
            <span>Project Guide</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onSurpriseMe}
            className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:shadow-rose-500/30 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span>Surprise Me</span>
          </button>
        </div>
      </div>
    </header>
  );
};
