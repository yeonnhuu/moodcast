
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoodEntry, EmotionTag } from "@/types/mood";
import WeatherImageDisplay from "./WeatherImageDisplay";
import PositiveMessageChat from "./PositiveMessageChat";
import { getWeatherImage, isNegativeEmotion } from "@/utils/moodUtils";

interface MoodEntryFormProps {
  onSave: (entry: MoodEntry) => void;
}

const emotionTags: EmotionTag[] = ['기쁨', '슬픔', '분노', '외로움', '불안', '무기력', '평온', '설렘'];

const MoodEntryForm: React.FC<MoodEntryFormProps> = ({ onSave }) => {
  const [text, setText] = useState('');
  const [emotionTag, setEmotionTag] = useState<EmotionTag>('기쁨');
  const [intensity, setIntensity] = useState(3);
  const [showPositiveChat, setShowPositiveChat] = useState(false);
  const [positiveMessage, setPositiveMessage] = useState<string>('');

  const handleSave = () => {
    if (!text.trim()) {
      alert('기분 내용을 입력해주세요.');
      return;
    }

    const entry: MoodEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      emotionTag,
      intensity,
      weatherImage: getWeatherImage(emotionTag, intensity),
      positiveMessage: positiveMessage || undefined,
      createdAt: new Date(),
    };

    onSave(entry);
    setText('');
    setIntensity(3);
    setShowPositiveChat(false);
    setPositiveMessage('');
  };

  const shouldShowPositiveButton = isNegativeEmotion(emotionTag) && intensity >= 3;

  return (
    <div className="space-y-6">
      {/* 메인 입력 카드 */}
      <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            지금 기분은 어떠신가요?
          </CardTitle>
          <p className="text-sm text-gray-600">오늘의 기분 날씨를 기록해보세요</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 기분 텍스트 입력 */}
          <div>
            <Label htmlFor="mood-text" className="text-gray-700 font-medium">기분 이야기</Label>
            <Textarea
              id="mood-text"
              placeholder="지금 느끼는 기분을 자유롭게 적어보세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              rows={4}
              className="mt-2 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">{text.length}/500</p>
              <p className="text-xs text-gray-400">솔직하게 표현해도 괜찮아요</p>
            </div>
          </div>

          {/* 감정 태그 선택 */}
          <div>
            <Label className="text-gray-700 font-medium">기분 종류</Label>
            <RadioGroup
              value={emotionTag}
              onValueChange={(value) => setEmotionTag(value as EmotionTag)}
              className="mt-3"
            >
              <div className="grid grid-cols-2 gap-3">
                {emotionTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2 bg-white/50 rounded-lg p-3 hover:bg-white/70 transition-colors">
                    <RadioGroupItem value={tag} id={tag} className="text-blue-500" />
                    <Label htmlFor={tag} className="text-sm font-medium cursor-pointer flex-1">
                      {getEmotionEmoji(tag)} {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* 감정 강도 선택 */}
          <div>
            <Label className="text-gray-700 font-medium">기분 강도: {intensity}</Label>
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

          {/* 기분 날씨 미리보기 */}
          <WeatherImageDisplay emotionTag={emotionTag} intensity={intensity} />

          {/* 저장 버튼 */}
          <div className="flex gap-3">
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              오늘의 Moodcast 저장
            </Button>
            {shouldShowPositiveButton && (
              <Button
                variant="outline"
                onClick={() => setShowPositiveChat(true)}
                className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                기분 다독이기
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 긍정 메시지 채팅 */}
      {showPositiveChat && (
        <PositiveMessageChat
          emotionTag={emotionTag}
          onMessageSave={setPositiveMessage}
          onClose={() => setShowPositiveChat(false)}
        />
      )}
    </div>
  );
};

// 감정별 이모지 매핑
const getEmotionEmoji = (emotion: EmotionTag): string => {
  const emojiMap = {
    '기쁨': '😊',
    '슬픔': '😢', 
    '분노': '😡',
    '외로움': '😔',
    '불안': '😰',
    '무기력': '😴',
    '평온': '😌',
    '설렘': '🥰'
  };
  return emojiMap[emotion] || '😐';
};

export default MoodEntryForm;
