import React, { useState, useEffect } from 'react';
import { MoodInfo, MoodType, Song } from './types/music';
import {
  MOODS,
  ALL_MOOD_LIST,
  getSongsForMood,
  getRandomMood,
} from './data/musicData';
import { Header } from './components/Header';
import { MoodCard } from './components/MoodCard';
import { RecommendationView } from './components/RecommendationView';
import { LoadingVibe } from './components/LoadingVibe';
import { PlayerModal } from './components/PlayerModal';
import { FavoritesModal } from './components/FavoritesModal';
import { ProjectInfoModal } from './components/ProjectInfoModal';
import {
  Sparkles,
  Headphones,
  Music2,
  Heart,
  BookOpen,
  Info,
} from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'moodify_favorites_v1';

export default function App() {
  const [selectedMood, setSelectedMood] = useState<MoodInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePlayerSong, setActivePlayerSong] = useState<Song | null>(null);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);
  const [showProjectInfoModal, setShowProjectInfoModal] = useState<boolean>(false);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const handleSelectMood = (mood: MoodInfo) => {
    setIsLoading(true);
    setSelectedMood(mood);
    // Smooth loading animation as requested in prompt (700ms)
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const handleSurpriseMe = () => {
    const randomMoodKey = getRandomMood(selectedMood?.id);
    const randomMood = MOODS[randomMoodKey];
    handleSelectMood(randomMood);
  };

  const handleToggleFavorite = (song: Song) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === song.id);
      if (exists) {
        return prev.filter((item) => item.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  };

  const handleRemoveFavorite = (songId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== songId));
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
  };

  const currentSongs = selectedMood ? getSongsForMood(selectedMood.id) : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-rose-500/30 selection:text-rose-200">
      {/* Background Decorative Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-rose-600/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      </div>

      {/* Top Bar with 3-Zone Contract */}
      <Header
        onSurpriseMe={handleSurpriseMe}
        onOpenFavorites={() => setShowFavoritesModal(true)}
        onOpenProjectInfo={() => setShowProjectInfoModal(true)}
        onGoHome={() => setSelectedMood(null)}
        favoritesCount={favorites.length}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {isLoading && selectedMood ? (
          <LoadingVibe mood={selectedMood} />
        ) : selectedMood ? (
          <RecommendationView
            mood={selectedMood}
            songs={currentSongs}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onPlayPreview={(song) => setActivePlayerSong(song)}
            onChooseAnotherMood={() => setSelectedMood(null)}
            onSurpriseMe={handleSurpriseMe}
            onSwitchMood={handleSelectMood}
          />
        ) : (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-300">
                <Headphones className="h-3.5 w-3.5" />
                <span>Mood-Based Music Recommendation System</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Moodify – Music for Your Mood
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Tell us how you feel, and we'll find the music for you.
              </p>

              {/* Action Strip: Surprise Me button & School project quick info */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleSurpriseMe}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Surprise Me With a Mood</span>
                </button>

                <button
                  onClick={() => setShowProjectInfoModal(true)}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition-colors cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 text-sky-400" />
                  <span>How Algorithm Works</span>
                </button>
              </div>
            </div>

            {/* Mood Options Grid: "How are you feeling today?" */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  How are you feeling today?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Choose a mood below to generate 5 personalized song recommendations.
                </p>
              </div>

              {/* 8 Clickable Mood Cards in a responsive 4-column (desktop) / 2-column (mobile) grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {ALL_MOOD_LIST.map((mood) => (
                  <MoodCard
                    key={mood.id}
                    mood={mood}
                    onSelect={handleSelectMood}
                  />
                ))}
              </div>
            </div>

            {/* Educational / School Project Feature Overview Strip */}
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <Music2 className="h-4 w-4" />
                    <h4>Curated Song Knowledge Base</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Over 40 classic and contemporary songs matched across 8 distinct psychoacoustic mood states.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Sparkles className="h-4 w-4" />
                    <h4>Affective Psychology Mapping</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Songs categorized according to tempo (BPM), scale mode, acoustic density, and emotional valence.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <Heart className="h-4 w-4" />
                    <h4>Interactive Media & Favorites</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Preview tracks with embedded playback, jump straight to YouTube, and save tracks to local storage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Moodify</span>
            <span>·</span>
            <span>School Project Mini-Application</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setShowProjectInfoModal(true)}
              className="hover:text-white transition-colors"
            >
              Project Documentation
            </button>
            <span>·</span>
            <button
              onClick={() => setShowFavoritesModal(true)}
              className="hover:text-white transition-colors"
            >
              Saved Tracks ({favorites.length})
            </button>
          </div>
        </div>
      </footer>

      {/* In-App Player Modal */}
      <PlayerModal
        song={activePlayerSong}
        moodInfo={selectedMood || undefined}
        isFavorite={
          activePlayerSong
            ? favorites.some((f) => f.id === activePlayerSong.id)
            : false
        }
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setActivePlayerSong(null)}
      />

      {/* Favorites Modal */}
      {showFavoritesModal && (
        <FavoritesModal
          favorites={favorites}
          onPlayPreview={(song) => {
            setShowFavoritesModal(false);
            setActivePlayerSong(song);
          }}
          onRemoveFavorite={handleRemoveFavorite}
          onClearAll={handleClearAllFavorites}
          onClose={() => setShowFavoritesModal(false)}
        />
      )}

      {/* Project Info Modal */}
      {showProjectInfoModal && (
        <ProjectInfoModal onClose={() => setShowProjectInfoModal(false)} />
      )}
    </div>
  );
}
