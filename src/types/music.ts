export type MoodType =
  | 'happy'
  | 'sad'
  | 'relaxed'
  | 'angry'
  | 'romantic'
  | 'energetic'
  | 'motivated'
  | 'stressed';

export interface MoodInfo {
  id: MoodType;
  name: string;
  emoji: string;
  tagline: string;
  friendlyMessage: string;
  accentHex: string;
  gradientClass: string;
  borderClass: string;
  textAccentClass: string;
  bgGlowClass: string;
}

export interface Song {
  id: string;
  moodId: MoodType;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  tempo: string;
  duration: string;
  moodReason: string;
  youtubeUrl: string;
  youtubeVideoId: string;
}
