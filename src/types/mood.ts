
export type EmotionTag = '기쁨' | '슬픔' | '분노' | '외로움' | '불안' | '무기력' | '평온' | '설렘';

export interface MoodEntry {
  id: string;
  text: string;
  emotionTag: EmotionTag;
  intensity: number;
  weatherImage: string;
  positiveMessage?: string;
  createdAt: Date;
}

export interface WeatherMapping {
  [key: string]: {
    [intensity: string]: string;
  };
}
