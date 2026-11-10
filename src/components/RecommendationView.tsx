import React, { useState, useMemo } from 'react';
import { MoodInfo, Song, MoodType } from '../types/music';
import { SongCard } from './SongCard';
import { ALL_MOOD_LIST } from '../data/musicData';
import {
  ArrowLeft,
  Sparkles,
  Search,
  Share2,
  Check,
  Music,
} from 'lucide-react';

interface RecommendationViewProps {
  mood: MoodInfo;
  songs: Song[];
  favorites: Song[];
  onToggleFavorite: (song: Song) => void;
  onPlayPreview: (song: Song) => void;
  onChooseAnotherMood: () => void;
  onSurpriseMe: () => void;
  onSwitchMood: (mood: MoodInfo) => void;
}

export const RecommendationView: React.FC<RecommendationViewProps> = ({
  mood,
  songs,
  favorites,
  onToggleFavorite,
  onPlayPreview,
  onChooseAnotherMood,
  onSurpriseMe,
  onSwitchMood,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites]
  );

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    const q = searchQuery.toLowerCase();
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q)
    );
  }, [songs, searchQuery]);

  const handleSharePlaylist = () => {
    const songListText = songs
      .map((s, idx) => `${idx + 1}. "${s.title}" by ${s.artist}`)
      .join('\n');
    const fullText = `Moodify – My ${mood.name} ${mood.emoji} Playlist:\n\n${songListText}\n\nRecommended by Moodify!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Navigation & Return Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onChooseAnotherMood}
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Choose Another Mood</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSharePlaylist}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Copy playlist summary to clipboard"
          >
            {copiedShare ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-slate-400" />
                <span>Share Playlist</span>
              </>
            )}
          </button>

          <button
            onClick={onSurpriseMe}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Surprise Me</span>
          </button>
        </div>
      </div>

      {/* Mood Hero Card with Friendly Message */}
      <div
        className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br ${mood.gradientClass} p-6 sm:p-8 shadow-2xl`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl" role="img" aria-label={mood.name}>
                {mood.emoji}
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Feeling {mood.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {mood.tagline}
                </p>
              </div>
            </div>

            {/* Friendly message required by prompt */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-slate-200">
                "{mood.friendlyMessage}"
              </p>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end text-right text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300">5 Handpicked Recommendations</span>
            <span>Psychoacoustic harmony & tempo matched</span>
          </div>
        </div>
      </div>

      {/* Quick Mood Bar to switch easily without going back */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
          Switch:
        </span>
        {ALL_MOOD_LIST.map((m) => {
          const isActive = m.id === mood.id;
          return (
            <button
              key={m.id}
              onClick={() => onSwitchMood(m)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Music className="h-5 w-5 text-rose-400" />
            <span>Recommended Tracks for You</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            5 songs scientifically & musically selected to fit your current mood state.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within songs..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none transition-colors focus:border-rose-500/80 focus:bg-slate-900"
          />
        </div>
      </div>

      {/* Recommendations Cards Grid (Desktop 2-3 columns, Mobile 1 column) */}
      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSongs.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              index={index}
              moodInfo={mood}
              isFavorite={favoriteIds.has(song.id)}
              onToggleFavorite={onToggleFavorite}
              onPlayPreview={onPlayPreview}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <p className="text-sm text-slate-400">
            No songs found matching "{searchQuery}".
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs font-semibold text-rose-400 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};
