
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmotionTag } from "@/types/mood";
import { getPositiveMessage } from "@/utils/moodUtils";

interface PositiveMessageChatProps {
  emotionTag: EmotionTag;
  onMessageSave: (message: string) => void;
  onClose: () => void;
}

const PositiveMessageChat: React.FC<PositiveMessageChatProps> = ({
  emotionTag,
  onMessageSave,
  onClose,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const message = getPositiveMessage(emotionTag);

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  const handleSaveMessage = () => {
    onMessageSave(message);
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="text-center">💙 감정 긍정하기</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showMessage ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              당신의 감정에 대한 따뜻한 메시지를 준비했어요.
            </p>
            <Button onClick={handleShowMessage} className="w-full">
              메시지 보기
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 leading-relaxed">{message}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveMessage} className="flex-1">
                일기에 저장하기
              </Button>
              <Button variant="outline" onClick={handleSkip} className="flex-1">
                저장하지 않기
              </Button>
            </div>
          </div>
        )}
        <Button variant="ghost" onClick={onClose} className="w-full">
          닫기
        </Button>
      </CardContent>
    </Card>
  );
};

export default PositiveMessageChat;
