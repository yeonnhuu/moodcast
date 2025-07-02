import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MoodEntry, EmotionTag, EmotionCharacter, CustomEmotion } from "@/types/mood";
import WeatherImageDisplay from "./WeatherImageDisplay";
import PositiveMessageChat from "./PositiveMessageChat";
import EmotionCharacter from "./EmotionCharacter";
import CustomEmotionCreator from "./CustomEmotionCreator";
import { getWeatherImage, isNegativeEmotion, getEmotionIcon } from "@/utils/moodUtils";
import { Sparkles, Heart } from 'lucide-react';

interface MoodEntryFormProps {
  onSave: (entry: MoodEntry) => void;
  emotionCharacters: EmotionCharacter[];
  customEmotions: CustomEmotion[];
  onCreateCustomEmotion: (emotion: CustomEmotion) => void;
}

const emotionTags: EmotionTag[] = ['기쁨', '슬픔', '분노', '외로움', '불안', '무기력', '평온', '설렘'];

const MoodEntryForm: React.FC<MoodEntryFormProps> = ({ 
  onSave, 
  emotionCharacters, 
  customEmotions, 
  onCreateCustomEmotion 
}) => {
  const [text, setText] = useState('');
  const [emotionTag, setEmotionTag] = useState<EmotionTag | string>('기쁨');
  const [intensity, setIntensity] = useState(3);
  const [showPositiveChat, setShowPositiveChat] = useState(false);
  const [positiveMessage, setPositiveMessage] = useState<string>('');
  const [isCustomEmotion, setIsCustomEmotion] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleSave = () => {
    if (!text.trim()) {
      alert('감정 내용을 입력해주세요.');
      return;
    }

    const customEmotionData = isCustomEmotion 
      ? customEmotions.find(e => e.name === emotionTag)
      : undefined;

    const entry: MoodEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      emotionTag,
      intensity,
      weatherImage: getWeatherImage(emotionTag as EmotionTag, intensity),
      positiveMessage: positiveMessage || undefined,
      createdAt: new Date(),
      isCustomEmotion,
      customEmotionData,
    };

    // Show success animation
    setShowSuccessAnimation(true);
    setTimeout(() => setShowSuccessAnimation(false), 2000);

    // Check if we should show positive chat
    if (isNegativeEmotion(emotionTag as EmotionTag) && intensity >= 3) {
      setShowPositiveChat(true);
    } else {
      onSave(entry);
      resetForm();
    }
  };

  const resetForm = () => {
    setText('');
    setIntensity(3);
    setShowPositiveChat(false);
    setPositiveMessage('');
    setIsCustomEmotion(false);
    setEmotionTag('기쁨');
  };

  const handlePositiveMessageSave = (message: string) => {
    setPositiveMessage(message);
    const entry: MoodEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      emotionTag,
      intensity,
      weatherImage: getWeatherImage(emotionTag as EmotionTag, intensity),
      positiveMessage: message,
      createdAt: new Date(),
      isCustomEmotion,
      customEmotionData: isCustomEmotion 
        ? customEmotions.find(e => e.name === emotionTag)
        : undefined,
    };
    onSave(entry);
    resetForm();
  };

  const getEmotionCharacter = (emotion: string): EmotionCharacter | undefined => {
    return emotionCharacters.find(char => char.emotionTag === emotion);
  };

  const handleEmotionSelect = (emotion: string, isCustom: boolean = false) => {
    setEmotionTag(emotion);
    setIsCustomEmotion(isCustom);
  };

  return (
    <div className="space-y-6">
      {/* Success Animation */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">기록 완료!</h3>
              <p className="text-gray-600">감정이 성공적으로 저장되었어요</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Input Card */}
      <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            지금 감정은 어떠신가요?
          </CardTitle>
          <p className="text-sm text-gray-600">오늘의 감정 날씨를 기록해보세요</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Emotion Text Input */}
          <div>
            <Label htmlFor="mood-text" className="text-gray-700 font-medium">감정 이야기</Label>
            <Textarea
              id="mood-text"
              placeholder="지금 느끼는 감정을 자유롭게 적어보세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              rows={4}
              className="mt-2 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">{text.length}/500</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Heart className="w-3 h-3" />
                솔직하게 표현해도 괜찮아요
              </p>
            </div>
          </div>

          {/* Emotion Selection with Characters */}
          <div>
            <Label className="text-gray-700 font-medium mb-3 block">감정 종류</Label>
            <div className="grid grid-cols-2 gap-3">
              {emotionTags.map((tag) => {
                const character = getEmotionCharacter(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleEmotionSelect(tag)}
                    className={`relative p-4 rounded-2xl transition-all duration-200 transform hover:scale-105 ${
                      emotionTag === tag && !isCustomEmotion
                        ? 'ring-2 ring-white ring-offset-2 shadow-lg scale-105' 
                        : 'hover:shadow-md'
                    } ${getEmotionGradient(tag)}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {character && (
                        <EmotionCharacter 
                          character={character} 
                          isActive={emotionTag === tag && !isCustomEmotion}
                        />
                      )}
                      <span className="text-white font-medium text-sm drop-shadow-sm">
                        {tag}
                      </span>
                    </div>
                  </button>
                );
              })}
              
              {/* Custom Emotions */}
              {customEmotions.map((emotion) => {
                const character = getEmotionCharacter(emotion.name);
                return (
                  <button
                    key={emotion.id}
                    onClick={() => handleEmotionSelect(emotion.name, true)}
                    className={`relative p-4 rounded-2xl transition-all duration-200 transform hover:scale-105 ${
                      emotionTag === emotion.name && isCustomEmotion
                        ? 'ring-2 ring-white ring-offset-2 shadow-lg scale-105' 
                        : 'hover:shadow-md'
                    } bg-gradient-to-br ${emotion.color}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {character && (
                        <EmotionCharacter 
                          character={character} 
                          isActive={emotionTag === emotion.name && isCustomEmotion}
                        />
                      )}
                      <span className="text-white font-medium text-sm drop-shadow-sm">
                        {emotion.name}
                      </span>
                    </div>
                  </button>
                );
              })}
              
              {/* Custom Emotion Creator */}
              <CustomEmotionCreator onCreateEmotion={onCreateCustomEmotion} />
            </div>
          </div>

          {/* Intensity Slider */}
          <div>
            <Label className="text-gray-700 font-medium">감정 강도: {intensity}</Label>
            <div className="mt-3 bg-white/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">약함</span>
                <span className="text-xs text-gray-500">강함</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i <= intensity ? 'bg-blue-500' : 'bg-gray-200'
                    } transition-colors`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Weather Preview */}
          <WeatherImageDisplay emotionTag={emotionTag as EmotionTag} intensity={intensity} />

          {/* Save Button */}
          <Button 
            onClick={handleSave} 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            오늘의 Moodcast 저장
          </Button>
        </CardContent>
      </Card>

      {/* Positive Message Chat */}
      {showPositiveChat && (
        <PositiveMessageChat
          emotionTag={emotionTag as EmotionTag}
          onMessageSave={handlePositiveMessageSave}
          onClose={() => setShowPositiveChat(false)}
        />
      )}
    </div>
  );
};

// 감정별 그라디언트 배경
const getEmotionGradient = (emotion: EmotionTag | string): string => {
  const gradients = {
    '기쁨': 'bg-gradient-to-br from-yellow-400 to-orange-400',
    '슬픔': 'bg-gradient-to-br from-gray-400 to-blue-500',
    '분노': 'bg-gradient-to-br from-red-500 to-purple-500',
    '외로움': 'bg-gradient-to-br from-gray-500 to-blue-400',
    '불안': 'bg-gradient-to-br from-purple-400 to-gray-500',
    '무기력': 'bg-gradient-to-br from-gray-600 to-gray-400',
    '평온': 'bg-gradient-to-br from-green-400 to-blue-400',
    '설렘': 'bg-gradient-to-br from-pink-400 to-purple-400'
  };
  return gradients[emotion] || 'bg-gradient-to-br from-gray-400 to-gray-500';
};

export default MoodEntryForm;
