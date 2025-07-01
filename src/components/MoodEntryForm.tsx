
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
      alert('감정 내용을 입력해주세요.');
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
      <Card>
        <CardHeader>
          <CardTitle>오늘의 감정을 기록해보세요</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="mood-text">감정 내용</Label>
            <Textarea
              id="mood-text"
              placeholder="하루 동안 느낀 감정을 자유롭게 적어보세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              rows={4}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">{text.length}/500</p>
          </div>

          <div>
            <Label>감정 태그</Label>
            <RadioGroup
              value={emotionTag}
              onValueChange={(value) => setEmotionTag(value as EmotionTag)}
              className="mt-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {emotionTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <RadioGroupItem value={tag} id={tag} />
                    <Label htmlFor={tag}>{tag}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>감정 강도: {intensity}</Label>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm">약함</span>
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm">강함</span>
            </div>
          </div>

          <WeatherImageDisplay emotionTag={emotionTag} intensity={intensity} />

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              감정일기 저장
            </Button>
            {shouldShowPositiveButton && (
              <Button
                variant="outline"
                onClick={() => setShowPositiveChat(true)}
                className="flex-1"
              >
                감정 긍정하기
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

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

export default MoodEntryForm;
