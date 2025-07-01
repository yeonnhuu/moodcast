
import React from 'react';
import { EmotionTag } from "@/types/mood";
import { getWeatherImage, getWeatherDescription } from "@/utils/moodUtils";

interface WeatherImageDisplayProps {
  emotionTag: EmotionTag;
  intensity: number;
}

const WeatherImageDisplay: React.FC<WeatherImageDisplayProps> = ({ emotionTag, intensity }) => {
  const weatherImage = getWeatherImage(emotionTag, intensity);
  const description = getWeatherDescription(emotionTag, intensity);

  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <div className="text-6xl mb-2">{weatherImage}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default WeatherImageDisplay;
