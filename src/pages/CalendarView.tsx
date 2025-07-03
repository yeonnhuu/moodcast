
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MoodEntry } from "@/types/mood";
import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getEmotionIcon } from "@/utils/moodUtils";

interface CalendarViewProps {
  entries?: MoodEntry[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ entries = [] }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEntries, setSelectedEntries] = useState<MoodEntry[]>([]);

  // Mock data for demonstration
  const mockEntries: MoodEntry[] = [
    {
      id: '1',
      text: '오늘은 정말 좋은 하루였어요!',
      emotionTag: '기쁨',
      intensity: 4,
      weatherImage: '',
      createdAt: new Date('2024-01-15'),
      visibility: 'private',
      reactions: [],
      userId: 'user1',
      userName: '나'
    },
    {
      id: '2',
      text: '조금 우울한 기분이에요.',
      emotionTag: '슬픔',
      intensity: 3,
      weatherImage: '',
      createdAt: new Date('2024-01-14'),
      visibility: 'private',
      reactions: [],
      userId: 'user1',
      userName: '나'
    }
  ];

  const allEntries = entries.length > 0 ? entries : mockEntries;

  const getEntriesForDate = (date: Date) => {
    return allEntries.filter(entry => isSameDay(entry.createdAt, date));
  };

  const getEmotionColor = (emotionTag: string): string => {
    const colors = {
      '기쁨': 'bg-yellow-400',
      '슬픔': 'bg-blue-500',
      '분노': 'bg-red-500',
      '외로움': 'bg-gray-500',
      '불안': 'bg-purple-500',
      '무기력': 'bg-gray-600',
      '평온': 'bg-green-400',
      '설렘': 'bg-pink-500'
    };
    return colors[emotionTag] || 'bg-gray-400';
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const entriesForDate = getEntriesForDate(date);
      setSelectedEntries(entriesForDate);
    }
  };

  const renderCalendarDay = (date: Date) => {
    const entriesForDay = getEntriesForDate(date);
    if (entriesForDay.length === 0) return null;

    return (
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-1">
          {entriesForDay.slice(0, 3).map((entry, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${getEmotionColor(entry.emotionTag)}`}
            />
          ))}
          {entriesForDay.length > 3 && (
            <div className="w-2 h-2 rounded-full bg-gray-300 text-xs">+</div>
          )}
        </div>
      </div>
    );
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
                감정 캘린더
              </h1>
              <p className="text-xs text-gray-600 mt-1">월별 감정 변화를 한눈에</p>
            </div>
            <div className="w-9" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Calendar */}
        <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              locale={ko}
              className="w-full"
              components={{
                Day: ({ date, ...props }) => (
                  <div className="relative" {...props}>
                    <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                      {date.getDate()}
                    </div>
                    {renderCalendarDay(date)}
                  </div>
                )
              }}
            />
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">감정 색상 가이드</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries({
                '기쁨': 'bg-yellow-400',
                '슬픔': 'bg-blue-500',
                '분노': 'bg-red-500',
                '외로움': 'bg-gray-500',
                '불안': 'bg-purple-500',
                '무기력': 'bg-gray-600',
                '평온': 'bg-green-400',
                '설렘': 'bg-pink-500'
              }).map(([emotion, color]) => (
                <div key={emotion} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-gray-600">{emotion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Entries */}
        {selectedEntries.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                {format(selectedDate, 'M월 d일', { locale: ko })}의 감정 기록
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {selectedEntries.map((entry) => {
                const emotionIcon = getEmotionIcon(entry.emotionTag as any);
                return (
                  <div key={entry.id} className="bg-white/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{emotionIcon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {entry.emotionTag}
                      </span>
                      <div className="flex gap-1 ml-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i <= entry.intensity ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {entry.text}
                    </p>
                    <div className="text-xs text-gray-400 mt-2">
                      {format(entry.createdAt, 'HH:mm', { locale: ko })}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {selectedEntries.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
            <CardContent className="text-center py-8">
              <div className="text-gray-500 text-sm">
                {format(selectedDate, 'M월 d일', { locale: ko })}에는 기록된 감정이 없어요
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
