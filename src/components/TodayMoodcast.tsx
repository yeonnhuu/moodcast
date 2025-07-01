
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodEntry } from "@/types/mood";
import { getWeatherDescription, getWeatherImage } from "@/utils/moodUtils";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface TodayMoodcastProps {
  todayMood: MoodEntry | null;
  onWriteClick: () => void;
}

const TodayMoodcast: React.FC<TodayMoodcastProps> = ({ todayMood, onWriteClick }) => {
  const currentTime = new Date();
  
  if (!todayMood) {
    return (
      <div className="space-y-6">
        {/* 빈 날씨 카드 */}
        <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 opacity-50 flex items-center justify-center">
              <span className="text-2xl">🌫️</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              아직 기록된 감정이 없어요
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              오늘의 첫 감정을 기록해보세요
            </p>
            <Button 
              onClick={onWriteClick}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              감정 기록하기
            </Button>
          </CardContent>
        </Card>

        {/* 현재 시간 정보 */}
        <Card className="bg-white/50 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>현재 시간</span>
              <span>{format(currentTime, 'HH:mm', { locale: ko })}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const gradientClass = getWeatherGradient(todayMood.emotionTag, todayMood.intensity);
  const description = getWeatherDescription(todayMood.emotionTag, todayMood.intensity);
  const weatherImageUrl = getWeatherImage(todayMood.emotionTag, todayMood.intensity);

  return (
    <div className="space-y-6">
      {/* 메인 감정 날씨 카드 */}
      <Card className={`${gradientClass} border-0 shadow-xl overflow-hidden relative`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <CardContent className="p-8 text-center relative z-10">
          <div className="text-white/90 text-sm mb-2">
            {format(todayMood.createdAt, 'M월 d일 EEEE', { locale: ko })}
          </div>
          
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
            <img 
              src={weatherImageUrl} 
              alt={description}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            {description}
          </h2>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
            <p className="text-white text-sm leading-relaxed">
              "{todayMood.text.length > 50 ? todayMood.text.substring(0, 50) + '...' : todayMood.text}"
            </p>
          </div>
          
          <div className="flex justify-center gap-4 text-white/80 text-xs">
            <span className="bg-white/20 px-2 py-1 rounded-full">
              {todayMood.emotionTag}
            </span>
            <span className="bg-white/20 px-2 py-1 rounded-full">
              강도 {todayMood.intensity}/5
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 감정 상세 정보 */}
      <Card className="bg-white/50 backdrop-blur-sm border-0">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">기록 시각</span>
              <span className="text-sm font-medium">
                {format(todayMood.createdAt, 'HH:mm', { locale: ko })}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">현재 감정</span>
              <span className="text-sm font-medium">{todayMood.emotionTag}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">강도</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= todayMood.intensity ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <Button 
        onClick={onWriteClick}
        variant="outline"
        className="w-full bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70"
      >
        새로운 감정 기록하기
      </Button>
    </div>
  );
};

// 감정에 따른 그라디언트 배경 함수
const getWeatherGradient = (emotionTag: string, intensity: number): string => {
  const gradients = {
    '기쁨': 'bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400',
    '슬픔': 'bg-gradient-to-br from-gray-400 via-blue-400 to-blue-600',
    '분노': 'bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500',
    '외로움': 'bg-gradient-to-br from-gray-500 via-gray-400 to-blue-300', 
    '불안': 'bg-gradient-to-br from-purple-400 via-gray-400 to-gray-500',
    '무기력': 'bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400',
    '평온': 'bg-gradient-to-br from-green-300 via-blue-300 to-blue-400',
    '설렘': 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400'
  };
  
  return gradients[emotionTag] || 'bg-gradient-to-br from-gray-400 to-gray-600';
};

export default TodayMoodcast;
