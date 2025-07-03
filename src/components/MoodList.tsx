
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodEntry, EmotionTag, ReactionType } from "@/types/mood";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Edit, Trash2, Lock, Users, Globe, Share2, Heart, Sparkles, MessageCircle } from 'lucide-react';
import MoodEditDialog from './MoodEditDialog';
import ReactionButtons from './ReactionButtons';
import CommentSection from './CommentSection';
import { getEmotionIcon } from "@/utils/moodUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MoodListProps {
  entries: MoodEntry[];
  onUpdate: (updatedEntry: MoodEntry) => void;
  onDelete: (entryId: string) => void;
}

const MoodList: React.FC<MoodListProps> = ({ entries, onUpdate, onDelete }) => {
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<MoodEntry | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  if (entries.length === 0) {
    return (
      <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
        <CardContent className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 opacity-50 flex items-center justify-center">
            <span className="text-4xl">🌤</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            아직 기록된 날씨가 없어요
          </h3>
          <p className="text-gray-500 text-sm">
            첫 번째 감정 날씨를 기록해보세요!
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleEdit = (entry: MoodEntry) => {
    setEditingEntry(entry);
  };

  const handleDelete = (entry: MoodEntry) => {
    setDeletingEntry(entry);
  };

  const confirmDelete = () => {
    if (deletingEntry) {
      onDelete(deletingEntry.id);
      setDeletingEntry(null);
    }
  };

  const handleReaction = (entryId: string, reactionType: ReactionType) => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;

    const currentUserId = 'current-user';
    const existingReaction = entry.reactions.find(
      r => r.type === reactionType && r.userId === currentUserId
    );

    let updatedReactions;
    if (existingReaction) {
      // Remove reaction
      updatedReactions = entry.reactions.filter(r => r.id !== existingReaction.id);
    } else {
      // Add reaction
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

    onUpdate({
      ...entry,
      reactions: updatedReactions
    });
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'private': return <Lock className="w-3 h-3" />;
      case 'friends': return <Users className="w-3 h-3" />;
      case 'public': return <Globe className="w-3 h-3" />;
      default: return <Lock className="w-3 h-3" />;
    }
  };

  const getVisibilityLabel = (visibility: string) => {
    switch (visibility) {
      case 'private': return '나만 보기';
      case 'friends': return '친구 공유';
      case 'public': return '모두 공개';
      default: return '나만 보기';
    }
  };

  const getReactionSummary = (reactions: any[]) => {
    const totalReactions = reactions.length;
    if (totalReactions === 0) return null;

    const reactionCounts = reactions.reduce((acc, reaction) => {
      acc[reaction.type] = (acc[reaction.type] || 0) + 1;
      return acc;
    }, {});

    return { totalReactions, reactionCounts };
  };

  // Helper function to get reaction emoji
  const getReactionEmoji = (reactionType: string): string => {
    const emojis: Record<string, string> = {
      empathy: '🤝',
      heart: '❤️',
      hug: '🫂',
      support: '💪'
    };
    return emojis[reactionType] || '👍';
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          감정 날씨 히스토리
        </h2>
        <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
          총 {entries.length}일
        </span>
      </div>
      
      {entries.map((entry) => {
        const gradientClass = getWeatherGradient(entry.emotionTag);
        const emotionIcon = getEmotionIcon(entry.emotionTag as EmotionTag);
        const reactionSummary = getReactionSummary(entry.reactions);
        const isShared = entry.visibility !== 'private';
        const commentsExpanded = expandedComments.has(entry.id);
        
        return (
          <Card key={entry.id} className={`${gradientClass} border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg flex-shrink-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-2xl text-white">
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
                            {getVisibilityIcon(entry.visibility)}
                            <span className="text-xs text-white">
                              {getVisibilityLabel(entry.visibility)}
                            </span>
                          </div>
                          {isShared && (
                            <div className="flex items-center gap-1 bg-blue-500/30 px-2 py-1 rounded-full">
                              <Share2 className="w-3 h-3 text-white" />
                              <span className="text-xs text-white">공유됨</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/80 text-xs">
                            {format(entry.createdAt, 'M.d HH:mm', { locale: ko })}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(entry)}
                              className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/20"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(entry)}
                              className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-white leading-relaxed text-sm mb-3 line-clamp-2">
                        {entry.text}
                      </p>
                      
                      {entry.positiveMessage && (
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 mb-3">
                          <p className="text-white/90 text-xs italic">
                            💙 {entry.positiveMessage}
                          </p>
                        </div>
                      )}

                      {/* Reaction Summary for Shared Entries */}
                      {isShared && reactionSummary && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-pink-300" />
                            <span className="text-white/90 text-sm font-medium">
                              {reactionSummary.totalReactions}개의 반응
                            </span>
                          </div>
                          <div className="flex gap-2 text-xs text-white/80">
                            {Object.entries(reactionSummary.reactionCounts).map(([type, count]) => (
                              <span key={type} className="bg-white/10 px-2 py-1 rounded-full">
                                {getReactionEmoji(type)} {count as number}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reactions - only show for non-private entries */}
                      {entry.visibility !== 'private' && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                          <ReactionButtons
                            reactions={entry.reactions}
                            onReact={(reactionType) => handleReaction(entry.id, reactionType)}
                            currentUserId="current-user"
                            showReactors={entry.visibility === 'friends'}
                          />
                          
                          {entry.commentsEnabled !== false && (
                            <div className="mt-3 border-t border-white/20 pt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleComments(entry.id)}
                                className="text-white/80 hover:text-white hover:bg-white/20 text-xs"
                              >
                                <MessageCircle className="w-3 h-3 mr-1" />
                                {commentsExpanded ? '댓글 접기' : '댓글 보기'}
                              </Button>
                              
                              {commentsExpanded && (
                                <div className="mt-2">
                                  <CommentSection
                                    entryId={entry.id}
                                    comments={entry.comments || []}
                                    onAddComment={(comment) => {
                                      const updatedEntry = {
                                        ...entry,
                                        comments: [...(entry.comments || []), comment]
                                      };
                                      onUpdate(updatedEntry);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
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

      {/* 수정 다이얼로그 */}
      {editingEntry && (
        <MoodEditDialog
          entry={editingEntry}
          open={!!editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={onUpdate}
        />
      )}

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={!!deletingEntry} onOpenChange={() => setDeletingEntry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>감정 일기를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 감정 일기가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// 감정에 따른 그라디언트 배경
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

export default MoodList;
