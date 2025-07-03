
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodEntry, ReactionType } from "@/types/mood";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArrowLeft, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactionButtons from '@/components/ReactionButtons';
import { getEmotionIcon } from "@/utils/moodUtils";

const SharedDiaries = () => {
  const navigate = useNavigate();
  
  // Mock data for shared diaries - in real app, this would come from API
  const [sharedEntries, setSharedEntries] = useState<MoodEntry[]>([
    {
      id: 'shared-1',
      text: '오늘 새로운 프로젝트를 시작했어요! 설렘과 불안이 동시에 드는 하루였습니다.',
      emotionTag: '설렘',
      intensity: 4,
      weatherImage: '',
      createdAt: new Date('2024-01-15T10:30:00'),
      visibility: 'friends',
      reactions: [
        { id: '1', type: 'empathy', userId: 'user1', userName: '민지', createdAt: new Date() },
        { id: '2', type: 'heart', userId: 'user2', userName: '준호', createdAt: new Date() }
      ],
      userId: 'friend-1',
      userName: '수진'
    },
    {
      id: 'shared-2',
      text: '요즘 일이 너무 많아서 스트레스를 많이 받고 있어요. 쉬고 싶은 마음이 크네요.',
      emotionTag: '불안',
      intensity: 4,
      weatherImage: '',
      createdAt: new Date('2024-01-14T15:20:00'),
      visibility: 'friends',
      reactions: [
        { id: '3', type: 'hug', userId: 'user3', userName: '현우', createdAt: new Date() },
        { id: '4', type: 'support', userId: 'user4', userName: '지은', createdAt: new Date() }
      ],
      userId: 'friend-2',
      userName: '태영'
    }
  ]);

  const handleReaction = (entryId: string, reactionType: ReactionType) => {
    setSharedEntries(prev => 
      prev.map(entry => {
        if (entry.id !== entryId) return entry;

        const currentUserId = 'current-user';
        const existingReaction = entry.reactions.find(
          r => r.type === reactionType && r.userId === currentUserId
        );

        let updatedReactions;
        if (existingReaction) {
          updatedReactions = entry.reactions.filter(r => r.id !== existingReaction.id);
        } else {
          updatedReactions = [
            ...entry.reactions,
            {
              id: Date.now().toString(),
              type: reactionType,
              userId: currentUserId,
              userName: '나',
              createdAt: new Date()
            }
          ];
        }

        return { ...entry, reactions: updatedReactions };
      })
    );
  };

  const getWeatherGradient = (emotionTag: string): string => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                친구들의 감정 일기
              </h1>
              <p className="text-xs text-gray-600 mt-1">공유된 감정에 반응해보세요</p>
            </div>
            <div className="w-9" /> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {sharedEntries.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 opacity-50 flex items-center justify-center">
                <Users className="text-4xl text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                공유된 일기가 없어요
              </h3>
              <p className="text-gray-500 text-sm">
                친구들이 감정을 공유하면 여기에 표시됩니다
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                친구들의 감정 날씨
              </h2>
              <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                {sharedEntries.length}개
              </span>
            </div>

            {sharedEntries.map((entry) => {
              const gradientClass = getWeatherGradient(entry.emotionTag);
              const emotionIcon = getEmotionIcon(entry.emotionTag as any);
              
              return (
                <Card key={entry.id} className={`${gradientClass} border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10 p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg flex-shrink-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-xl text-white">
                              {emotionIcon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-white/30 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  {entry.emotionTag}
                                </span>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                      key={i}
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        i <= entry.intensity ? 'bg-white' : 'bg-white/30'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-white/80 text-xs font-medium">
                                  {entry.userName}
                                </div>
                                <div className="text-white/60 text-xs">
                                  {format(entry.createdAt, 'M.d HH:mm', { locale: ko })}
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-white leading-relaxed text-sm mb-4">
                              {entry.text}
                            </p>

                            {/* Reactions */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                              <ReactionButtons
                                reactions={entry.reactions}
                                onReact={(reactionType) => handleReaction(entry.id, reactionType)}
                                currentUserId="current-user"
                                showReactors={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedDiaries;
