import React from 'react';
import { Song, MoodInfo } from '../types/music';
import { Play, ExternalLink, Heart, Disc3 } from 'lucide-react';

interface SongCardProps {
  song: Song;
  index: number;
  moodInfo: MoodInfo;
  isFavorite: boolean;
  onToggleFavorite: (song: Song) => void;
  onPlayPreview: (song: Song) => void;
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  index,
  moodInfo,
  isFavorite,
  onToggleFavorite,
  onPlayPreview,
}) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl">
      {/* Subtle mood tint background glow on card hover */}
      <div
        className={`absolute -right-10 -bottom-10 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-40 ${moodInfo.bgGlowClass}`}
      />

      <div>
        {/* Header line: Track Number, Vinyl Disc, and Favorite Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-400 group-hover:text-white transition-colors">
              <Disc3 className="h-4 w-4 transition-transform duration-700 group-hover:rotate-180" />
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite(song)}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
          >
            <Heart
              className={`h-4 w-4 transition-transform active:scale-125 ${
                isFavorite
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-slate-400 group-hover:text-slate-200'
              }`}
            />
          </button>
        </div>

        {/* Title, Artist, Album */}
        <div className="mt-4">
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-rose-300/90 transition-colors">
            {song.title}
          </h4>
          <p className="text-sm font-medium text-slate-300 mt-0.5">
            {song.artist}
          </p>
          {song.album && (
            <p className="text-xs text-slate-400 italic mt-0.5 truncate">
              Album: {song.album}
            </p>
          )}
        </div>

        {/* Zero-Pill Unboxed Metadata with · separator */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <span>{song.genre}</span>
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          <span className="tabular-nums">{song.year}</span>
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          <span className="tabular-nums">{song.duration}</span>
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          <span className="font-mono tabular-nums text-slate-300">
            {song.tempo}
          </span>
        </div>

        {/* Mood Match Rationale */}
        <div className="mt-4 rounded-xl border border-slate-800/70 bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-200">Why it matches: </span>
          <span>{song.moodReason}</span>
        </div>
      </div>

      {/* Action Buttons: In-App Playback & Direct YouTube Link */}
      <div className="mt-5 flex items-center gap-2 pt-3 border-t border-slate-800/60">
        <button
          onClick={() => onPlayPreview(song)}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Play in App</span>
        </button>

        <a
          href={song.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/40 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-colors whitespace-nowrap"
          title="Open in YouTube"
        >
          <span>YouTube</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
