import React from 'react';
import { Song } from '../types/music';
import { MOODS } from '../data/musicData';
import { X, Trash2, Play, ExternalLink, Heart, Music } from 'lucide-react';

interface FavoritesModalProps {
  favorites: Song[];
  onPlayPreview: (song: Song) => void;
  onRemoveFavorite: (songId: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  favorites,
  onPlayPreview,
  onRemoveFavorite,
  onClearAll,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
              <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                My Saved Songs
              </h3>
              <p className="text-xs text-slate-400">
                {favorites.length} {favorites.length === 1 ? 'track' : 'tracks'} saved to favorites
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* List of Favorites */}
        <div className="overflow-y-auto p-6 space-y-3">
          {favorites.length > 0 ? (
            favorites.map((song) => {
              const mood = MOODS[song.moodId];
              return (
                <div
                  key={song.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition-all hover:border-slate-700 hover:bg-slate-950"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5" role="img" aria-label={mood?.name}>
                      {mood?.emoji || '🎵'}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                        {song.title}
                      </h4>
                      <p className="text-xs text-slate-300">{song.artist}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span>{mood?.name || 'Vibe'}</span>
                        <span>·</span>
                        <span>{song.genre}</span>
                        <span>·</span>
                        <span className="tabular-nums">{song.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onPlayPreview(song)}
                      className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Play</span>
                    </button>

                    <a
                      href={song.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-xl border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Open in YouTube"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <button
                      onClick={() => onRemoveFavorite(song.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-500 mb-3">
                <Music className="h-7 w-7" />
              </div>
              <h4 className="text-base font-bold text-white">No saved songs yet</h4>
              <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">
                Click the heart icon on any song card to save your favorite mood tracks here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
