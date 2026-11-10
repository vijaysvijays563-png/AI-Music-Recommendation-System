import React from 'react';
import { Song, MoodInfo } from '../types/music';
import { X, ExternalLink, Heart, Music, Disc } from 'lucide-react';

interface PlayerModalProps {
  song: Song | null;
  moodInfo?: MoodInfo;
  isFavorite: boolean;
  onToggleFavorite: (song: Song) => void;
  onClose: () => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  song,
  moodInfo,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  if (!song) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
              <Disc className="h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                Now Playing Preview
              </h3>
              <p className="text-xs text-slate-400">
                {song.title} · {song.artist}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${song.youtubeVideoId}?autoplay=1&rel=0`}
            title={`${song.title} by ${song.artist}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>

        {/* Song Details & Reasoning */}
        <div className="p-6 space-y-4 bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-lg font-bold text-white">{song.title}</h4>
              <p className="text-sm text-slate-300 font-medium">{song.artist}</p>
              {song.album && (
                <p className="text-xs text-slate-400 italic">Album: {song.album}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(song)}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  isFavorite
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                    : 'border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
                />
                <span>{isFavorite ? 'Saved' : 'Favorite'}</span>
              </button>

              <a
                href={song.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-500 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800/60">
            <span>{song.genre}</span>
            <span aria-hidden="true">·</span>
            <span>{song.year}</span>
            <span aria-hidden="true">·</span>
            <span>{song.duration}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{song.tempo}</span>
          </div>

          {/* Why it matches */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white">Mood Rationale: </span>
            {song.moodReason}
          </div>
        </div>
      </div>
    </div>
  );
};
