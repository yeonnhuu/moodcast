
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
  const gradientClass = getWeatherGradient(emotionTag);

  return (
    <div className={`${gradientClass} rounded-2xl p-6 text-center shadow-lg relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden shadow-lg">
          <img 
            src={weatherImage} 
            alt={description}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">
          오늘의 감정 날씨
        </h3>
        <p className="text-white/90 text-sm">{description}</p>
        
        {/* 날씨 세부 정보 */}
        <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-3">
          <div className="flex justify-between items-center text-white/90 text-xs">
            <span>감정 종류</span>
            <span className="font-medium">{emotionTag}</span>
          </div>
          <div className="flex justify-between items-center text-white/90 text-xs mt-1">
            <span>강도</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i <= intensity ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 감정에 따른 그라디언트 배경
const getWeatherGradient = (emotionTag: EmotionTag): string => {
  const gradients = {
    '기쁨': 'bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400',
    '슬픔': 'bg-gradient-to-br from-gray-500 via-blue-500 to-blue-700',
    '분노': 'bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500',
    '외로움': 'bg-gradient-to-br from-gray-600 via-gray-500 to-blue-400',
    '불안': 'bg-gradient-to-br from-purple-500 via-gray-500 to-gray-600',
    '무기력': 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500',
    '평온': 'bg-gradient-to-br from-green-400 via-blue-400 to-blue-500',
    '설렘': 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500'
  };
  
  return gradients[emotionTag] || 'bg-gradient-to-br from-gray-500 to-gray-600';
};

export default WeatherImageDisplay;
