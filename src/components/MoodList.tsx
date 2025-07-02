
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodEntry, EmotionTag } from "@/types/mood";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Edit, Trash2 } from 'lucide-react';
import MoodEditDialog from './MoodEditDialog';
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
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 mt-3">
                          <p className="text-white/90 text-xs italic">
                            💙 {entry.positiveMessage}
                          </p>
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
