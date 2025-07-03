
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodEntry, ReactionType } from "@/types/mood";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArrowLeft, Globe, Users, MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactionButtons from '@/components/ReactionButtons';
import CommentSection from '@/components/CommentSection';
import { getEmotionIcon } from "@/utils/moodUtils";

const CommunityFeed = () => {
  const navigate = useNavigate();
  
  // Mock data for public shared diaries
  const [communityEntries, setCommunityEntries] = useState<MoodEntry[]>([
    {
      id: 'public-1',
      text: '오늘 드디어 꿈꾸던 직장에 합격했어요! 정말 기쁘고 설렙니다. 새로운 시작이 두렵기도 하지만 열심히 해보겠습니다.',
      emotionTag: '기쁨',
      intensity: 5,
      weatherImage: '',
      createdAt: new Date('2024-01-15T14:30:00'),
      visibility: 'public',
      reactions: [
        { id: '1', type: 'heart', userId: 'user1', userName: '민지', createdAt: new Date() },
        { id: '2', type: 'support', userId: 'user2', userName: '준호', createdAt: new Date() }
      ],
      comments: [
        { id: 'c1', text: '축하해요! 정말 멋져요 🎉', userId: 'user1', userName: '민지', createdAt: new Date() }
      ],
      commentsEnabled: true,
      userId: 'community-user-1',
      userName: '익명의 친구'
    },
    {
      id: 'public-2',
      text: '요즘 많이 우울하고 무기력해요. 아무것도 하기 싫고 의욕이 없네요. 이런 날들이 언제까지 계속될까요?',
      emotionTag: '무기력',
      intensity: 4,
      weatherImage: '',
      createdAt: new Date('2024-01-14T20:15:00'),
      visibility: 'public',
      reactions: [
        { id: '3', type: 'hug', userId: 'user3', userName: '현우', createdAt: new Date() },
        { id: '4', type: 'empathy', userId: 'user4', userName: '지은', createdAt: new Date() },
        { id: '5', type: 'heart', userId: 'user5', userName: '서연', createdAt: new Date() }
      ],
      comments: [
        { id: 'c2', text: '힘든 시간이지만 곧 좋아질 거예요. 응원해요!', userId: 'user3', userName: '현우', createdAt: new Date() },
        { id: 'c3', text: '저도 비슷한 경험이 있어요. 혼자가 아니에요 🤗', userId: 'user4', userName: '지은', createdAt: new Date() }
      ],
      commentsEnabled: true,
      userId: 'community-user-2',
      userName: '같은 마음'
    }
  ]);

  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const handleReaction = (entryId: string, reactionType: ReactionType) => {
    setCommunityEntries(prev => 
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

  const toggleComments = (entryId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(entryId)) {
        newSet.delete(entryId);
      } else {
        newSet.add(entryId);
      }
      return newSet;
    });
  };

  const handleAddComment = (entryId: string, comment: any) => {
    setCommunityEntries(prev =>
      prev.map(entry =>
        entry.id === entryId
          ? { ...entry, comments: [...(entry.comments || []), comment] }
          : entry
      )
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
                커뮤니티 피드
              </h1>
              <p className="text-xs text-gray-600 mt-1">함께 나누는 감정 이야기</p>
            </div>
            <div className="w-9" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {communityEntries.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 opacity-50 flex items-center justify-center">
                <Globe className="text-4xl text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                공유된 이야기가 없어요
              </h3>
              <p className="text-gray-500 text-sm">
                다른 사람들의 감정 이야기를 기다리고 있어요
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                모두의 감정 날씨
              </h2>
              <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                {communityEntries.length}개
              </span>
            </div>

            {communityEntries.map((entry) => {
              const gradientClass = getWeatherGradient(entry.emotionTag);
              const emotionIcon = getEmotionIcon(entry.emotionTag as any);
              const commentsExpanded = expandedComments.has(entry.id);
              
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
                                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                                  <Globe className="w-3 h-3 text-white" />
                                  <span className="text-xs text-white">공개</span>
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
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
                              <ReactionButtons
                                reactions={entry.reactions}
                                onReact={(reactionType) => handleReaction(entry.id, reactionType)}
                                currentUserId="current-user"
                                showReactors={false}
                              />
                            </div>

                            {/* Comments Section */}
                            {entry.commentsEnabled && (
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleComments(entry.id)}
                                    className="text-white/80 hover:text-white hover:bg-white/20 text-xs p-1"
                                  >
                                    <MessageCircle className="w-3 h-3 mr-1" />
                                    댓글 {entry.comments?.length || 0}개
                                  </Button>
                                  {entry.reactions.length > 0 && (
                                    <div className="flex items-center gap-1 text-white/80 text-xs">
                                      <Heart className="w-3 h-3" />
                                      {entry.reactions.length}
                                    </div>
                                  )}
                                </div>
                                
                                {commentsExpanded && (
                                  <CommentSection
                                    entryId={entry.id}
                                    comments={entry.comments || []}
                                    onAddComment={(comment) => handleAddComment(entry.id, comment)}
                                  />
                                )}
                              </div>
                            )}
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

export default CommunityFeed;
