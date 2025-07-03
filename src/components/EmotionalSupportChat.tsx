
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, X, Sparkles } from 'lucide-react';
import type { EmotionTag } from "@/types/mood";

interface EmotionalSupportChatProps {
  emotionTag: EmotionTag;
  onMessageAccept: (message: string) => void;
  onClose: () => void;
}

const EmotionalSupportChat: React.FC<EmotionalSupportChatProps> = ({
  emotionTag,
  onMessageAccept,
  onClose
}) => {
  const [selectedMessage, setSelectedMessage] = useState<string>('');

  const getSupportMessages = (emotion: EmotionTag): string[] => {
    const messages = {
      '슬픔': [
        "슬픔을 느끼는 것은 당신이 소중한 것들을 사랑할 줄 아는 마음이 있다는 증거예요.",
        "지금은 힘들겠지만, 이 감정도 지나갈 거예요. 당신은 혼자가 아니에요.",
        "슬픔을 통해 우리는 더 깊이 공감할 수 있게 되어요. 당신의 감정은 소중해요."
      ],
      '분노': [
        "화가 났다는 건, 당신에게 그만큼 중요한 가치가 있다는 뜻일지도 몰라요.",
        "분노는 변화를 위한 에너지가 될 수 있어요. 건강한 방법으로 표현해보세요.",
        "감정을 인정하고 받아들이는 것이 첫 번째 단계예요. 당신이 느끼는 것은 타당해요."
      ],
      '외로움': [
        "외로움을 느낄 수 있다는 건, 연결을 원하는 따뜻한 마음이 있다는 뜻이에요.",
        "혼자라고 느껴져도, 당신을 이해하고 응원하는 사람들이 있어요.",
        "외로움은 새로운 관계를 만들어가는 시작점이 될 수 있어요."
      ],
      '불안': [
        "불안함은 당신이 앞으로 나아가려는 용기의 다른 이름일 수 있어요.",
        "불안할 때는 깊게 숨을 쉬고, 지금 이 순간에 집중해보세요.",
        "모든 것을 완벽하게 해낼 필요는 없어요. 조금씩 해나가면 돼요."
      ],
      '무기력': [
        "오늘은 아무것도 하지 않아도 괜찮아요. 당신이 멈춘 건, 회복의 시작일 수 있어요.",
        "작은 것부터 시작해보세요. 한 걸음씩 걷다 보면 길이 보일 거예요.",
        "무기력함도 하나의 감정이에요. 자신을 탓하지 마시고, 천천히 회복해나가세요."
      ],
      '기쁨': [
        "기쁨을 느끼는 순간을 소중히 간직하세요. 이런 감정이 당신에게 힘이 될 거예요.",
        "행복한 감정을 나누면 더 커져요. 주변 사람들과 이 기쁨을 공유해보세요."
      ],
      '평온': [
        "평온한 마음 상태를 느끼고 있다니 정말 좋네요. 이 순간을 충분히 즐기세요.",
        "내면의 평화를 찾으셨군요. 이런 상태를 기억해두시면 힘든 때 도움이 될 거예요."
      ],
      '설렘': [
        "설렘은 새로운 가능성에 대한 기대예요. 이 에너지를 긍정적으로 활용해보세요.",
        "설레는 마음을 간직하면서도, 현재 순간의 소중함도 놓치지 마세요."
      ]
    };
    
    return messages[emotion] || ["당신의 감정은 소중하고 의미가 있어요. 자신을 돌보는 시간을 가져보세요."];
  };

  const supportMessages = getSupportMessages(emotionTag);

  const handleAcceptMessage = () => {
    if (selectedMessage) {
      onMessageAccept(selectedMessage);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            감정 도우미
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-white/70 rounded-lg p-3 border-l-4 border-blue-400">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">따뜻한 응원의 메시지</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            어려운 감정을 느끼고 계시는군요. 이런 메시지들 중에서 마음에 드는 것이 있다면, 
            일기에 함께 저장해보는 건 어떨까요?
          </p>
        </div>
        
        <div className="space-y-2">
          {supportMessages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedMessage === message
                  ? 'bg-blue-100 border-2 border-blue-300'
                  : 'bg-white/50 hover:bg-white/70 border border-gray-200'
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            나중에 할게요
          </Button>
          <Button
            onClick={handleAcceptMessage}
            disabled={!selectedMessage}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            일기에 추가하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionalSupportChat;
