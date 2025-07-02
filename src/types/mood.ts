
export type EmotionTag = '기쁨' | '슬픔' | '분노' | '외로움' | '불안' | '무기력' | '평온' | '설렘' | 'custom';

export interface CustomEmotion {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface EmotionCharacter {
  emotionTag: EmotionTag | string;
  level: number;
  experiencePoints: number;
  appearance: string;
}

export interface UserStreak {
  currentStreak: number;
  longestStreak: number;
  lastEntryDate: Date | null;
}

export interface MoodEntry {
  id: string;
  text: string;
  emotionTag: EmotionTag | string;
  intensity: number;
  weatherImage: string;
  positiveMessage?: string;
  createdAt: Date;
  isCustomEmotion?: boolean;
  customEmotionData?: CustomEmotion;
}

export interface WeatherMapping {
  [key: string]: {
    [intensity: string]: string;
  };
}
