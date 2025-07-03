import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodEntry } from "@/types/mood";
import type { EmotionCharacter } from "@/types/mood";
import { getWeatherDescription, getEmotionIcon } from "@/utils/moodUtils";
import EmotionCharacterComponent from "./EmotionCharacter";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Sunrise, Cloud, Star, Calendar, TrendingUp } from 'lucide-react';

interface TodayMoodcastProps {
  todayMood: MoodEntry | null;
  onWriteClick: () => void;
  emotionCharacters: EmotionCharacter[];
  allTodayEntries?: MoodEntry[];
}

const TodayMoodcast: React.FC<TodayMoodcastProps> = ({ 
  todayMood, 
  onWriteClick, 
  emotionCharacters,
  allTodayEntries = []
}) => {
  const currentTime = new Date();
  
  const getEmotionCharacterForMood = (emotionTag: string): EmotionCharacter | undefined => {
    return emotionCharacters.find(char => char.emotionTag === emotionTag);
  };

  const getTodaysEmotionSummary = () => {
    if (allTodayEntries.length === 0) return null;
    
    const emotionCounts = allTodayEntries.reduce((acc, entry) => {
      acc[entry.emotionTag] = (acc[entry.emotionTag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgIntensity = allTodayEntries.reduce((sum, entry) => sum + entry.intensity, 0) / allTodayEntries.length;
    
    return { emotionCounts, avgIntensity, totalEntries: allTodayEntries.length };
  };

  const summary = getTodaysEmotionSummary();
  
  if (!todayMood && allTodayEntries.length === 0) {
    return (
      <div className="space-y-6">
        {/* Empty Weather Card */}
        <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 opacity-50 flex items-center justify-center">
                <Cloud className="w-10 h-10 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                아직 기록된 감정이 없어요
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                오늘의 첫 감정을 기록해보세요
              </p>
              <Button 
                onClick={onWriteClick}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
              >
                <Star className="w-4 h-4 mr-2" />
                감정 기록하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Time Info */}
        <Card className="bg-white/50 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Sunrise className="w-4 h-4" />
                <span>현재 시간</span>
              </div>
              <span className="font-medium">{format(currentTime, 'HH:mm', { locale: ko })}</span>
            </div>
          </CardContent>
        </Card>

        {/* Character Gallery */}
        <Card className="bg-white/50 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">감정 친구들</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {emotionCharacters.slice(0, 6).map((character) => (
                <div key={character.emotionTag} className="flex-shrink-0">
                  <EmotionCharacterComponent character={character} />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">감정을 기록할 때마다 친구들이 성장해요!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If we have multiple entries today, show comprehensive view
  if (allTodayEntries.length > 1) {
    return (
      <div className="space-y-6">
        {/* Today's Emotional Weather Summary */}
        <Card className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 border-0 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-6 text-center relative z-10">
            <div className="text-white/90 text-sm mb-2">
              {format(currentTime, 'M월 d일 EEEE', { locale: ko })}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              복합적인 감정의 하루
            </h2>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
              <div className="text-white text-sm">
                오늘 {summary?.totalEntries}번의 감정을 기록했어요
              </div>
              <div className="text-white/80 text-xs mt-1">
                평균 강도: {summary?.avgIntensity.toFixed(1)}/5
              </div>
            </div>
            
            {/* Active Characters */}
            <div className="flex justify-center gap-2 mb-4">
              {Object.keys(summary?.emotionCounts || {}).slice(0, 4).map((emotion) => {
                const character = getEmotionCharacterForMood(emotion);
                return character ? (
                  <div key={emotion} className="relative">
                    <EmotionCharacterComponent character={character} isActive={true} />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {summary?.emotionCounts[emotion]}
                      </span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Entries Timeline */}
        <Card className="bg-white/50 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">오늘의 감정 기록</h3>
            </div>
            
            <div className="space-y-3">
              {allTodayEntries.slice().reverse().map((entry, index) => {
                const emotionIcon = getEmotionIcon(entry.emotionTag as any);
                return (
                  <div key={entry.id} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                    <div className="text-lg">{emotionIcon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {entry.emotionTag}
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                i <= entry.intensity ? 'bg-blue-500' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {entry.text}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(entry.createdAt, 'HH:mm', { locale: ko })}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Character Growth Summary */}
        <Card className="bg-white/50 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-medium text-gray-700">성장한 감정 친구들</h3>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(summary?.emotionCounts || {}).map((emotion) => {
                const character = getEmotionCharacterForMood(emotion);
                return character ? (
                  <div key={emotion} className="text-center">
                    <EmotionCharacterComponent character={character} />
                    <div className="text-xs text-gray-600 mt-1">
                      +{(summary?.emotionCounts[emotion] || 0) * 20}XP
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          onClick={onWriteClick}
          variant="outline"
          className="w-full bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70 transition-all duration-200"
        >
          <Star className="w-4 h-4 mr-2" />
          새로운 감정 기록하기
        </Button>
      </div>
    );
  }

  // Single entry view (existing logic)
  if (todayMood) {
    const gradientClass = getWeatherGradient(todayMood.emotionTag, todayMood.intensity);
    const description = getWeatherDescription(todayMood.emotionTag as any, todayMood.intensity);
    const emotionCharacter = getEmotionCharacterForMood(todayMood.emotionTag);

    return (
      <div className="space-y-6">
        {/* Main Emotion Weather Card */}
        <Card className={`${gradientClass} border-0 shadow-xl overflow-hidden relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-8 text-center relative z-10">
            <div className="text-white/90 text-sm mb-2">
              {format(todayMood.createdAt, 'M월 d일 EEEE', { locale: ko })}
            </div>
            
            {/* Character Display */}
            {emotionCharacter && (
              <div className="mb-4">
                <EmotionCharacterComponent character={emotionCharacter} isActive={true} />
              </div>
            )}
            
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

        {/* Emotion Details */}
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
              
              {emotionCharacter && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">캐릭터 레벨</span>
                  <span className="text-sm font-medium">Lv.{emotionCharacter.level}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          onClick={onWriteClick}
          variant="outline"
          className="w-full bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70 transition-all duration-200"
        >
          <Star className="w-4 h-4 mr-2" />
          새로운 감정 기록하기
        </Button>
      </div>
    );
  }

  return null;
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
