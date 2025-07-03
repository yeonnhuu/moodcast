
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MoodEntry, EmotionTag, VisibilityLevel } from "@/types/mood";
import { getEmotionIcon } from "@/utils/moodUtils";
import VisibilitySelector from "./VisibilitySelector";

interface MoodEditDialogProps {
  entry: MoodEntry;
  open: boolean;
  onClose: () => void;
  onSave: (updatedEntry: MoodEntry) => void;
}

const emotionTags: EmotionTag[] = ['기쁨', '슬픔', '분노', '외로움', '불안', '무기력', '평온', '설렘'];

const MoodEditDialog: React.FC<MoodEditDialogProps> = ({ entry, open, onClose, onSave }) => {
  const [text, setText] = useState(entry.text);
  const [emotionTag, setEmotionTag] = useState<EmotionTag | string>(entry.emotionTag);
  const [intensity, setIntensity] = useState(entry.intensity);
  const [visibility, setVisibility] = useState<VisibilityLevel>(entry.visibility || 'private');

  const handleSave = () => {
    const updatedEntry: MoodEntry = {
      ...entry,
      text: text.trim(),
      emotionTag,
      intensity,
      visibility,
    };
    onSave(updatedEntry);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>감정 일기 수정</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-text">감정 이야기</Label>
            <Textarea
              id="edit-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label>감정 종류</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {emotionTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setEmotionTag(tag)}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    emotionTag === tag 
                      ? 'ring-2 ring-blue-500 ring-offset-2' 
                      : 'hover:shadow-md'
                  } ${getEmotionGradient(tag)}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xl text-white">
                      {getEmotionIcon(tag)}
                    </div>
                    <span className="text-white text-xs font-medium">
                      {tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>감정 강도: {intensity}</Label>
            <div className="mt-2">
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= intensity ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <VisibilitySelector 
            visibility={visibility}
            onVisibilityChange={setVisibility}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const getEmotionGradient = (emotion: EmotionTag): string => {
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

export default MoodEditDialog;
