import React from 'react';
import { X, BookOpen, Brain, Music, Cpu, Award } from 'lucide-react';

interface ProjectInfoModalProps {
  onClose: () => void;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                School Project Documentation
              </h3>
              <p className="text-xs text-slate-400">
                Moodify: Mood-Based Music Recommendation System
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

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Objective */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Award className="h-4 w-4 text-amber-400" />
              <h4>1. Project Objective</h4>
            </div>
            <p className="text-xs text-slate-400">
              The objective of this application is to recommend curated musical tracks to users based on their real-time emotional state. Instead of navigating endless genre catalogs, users simply state how they feel, and the system delivers songs whose acoustic, rhythmic, and lyrical attributes match or improve their mood.
            </p>
          </div>

          {/* Section 2: Algorithm & Psychoacoustics */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Brain className="h-4 w-4 text-rose-400" />
              <h4>2. Musical Psychology & Affective Mapping</h4>
            </div>
            <p className="text-xs text-slate-400">
              The recommendation engine is grounded in <strong>Russell's Circumplex Model of Affect</strong>, dividing human emotion along two primary dimensions: <em>Valence</em> (Pleasantness) and <em>Arousal</em> (Energy level):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <span className="font-semibold text-amber-400">High Valence / High Arousal:</span>
                <p className="text-slate-400 mt-1">Happy, Energetic, Motivated (110–160+ BPM, Major keys, driving rhythms).</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <span className="font-semibold text-indigo-400">Low Valence / Low Arousal:</span>
                <p className="text-slate-400 mt-1">Sad, Stressed (45–80 BPM, Minor/Impressionist keys, spacious acoustics).</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <span className="font-semibold text-emerald-400">High Valence / Low Arousal:</span>
                <p className="text-slate-400 mt-1">Relaxed, Romantic (60–90 BPM, Soft warm timbres, smooth syncopation).</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <span className="font-semibold text-red-400">Low Valence / High Arousal:</span>
                <p className="text-slate-400 mt-1">Angry (110–145 BPM, Heavy distortion, intense drums for emotional catharsis).</p>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Implementation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <h4>3. Technical Architecture</h4>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
              <li><strong>Framework:</strong> React 19 + TypeScript on Vite.</li>
              <li><strong>Styling:</strong> Modern Tailwind CSS v4 with responsive flex/grid viewports.</li>
              <li><strong>Local Storage:</strong> Persistent bookmarking system for favorite tracks across sessions.</li>
              <li><strong>Media Integration:</strong> Direct YouTube watch links and in-app embed preview player.</li>
              <li><strong>Zero External API Dependency:</strong> Fast, offline-resilient local JSON knowledge base containing 40 carefully classified songs across 8 moods.</li>
            </ul>
          </div>

          {/* Section 4: Classroom Presentation Rubric */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs space-y-1">
            <span className="font-bold text-rose-300">Tips for Project Presentation:</span>
            <p className="text-slate-400">
              Demonstrate clicking different moods to show dynamic UI themes, try the "Surprise Me" button, play a video preview in the app, and bookmark a song to show local storage persistence!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
