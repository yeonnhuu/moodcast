
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MoodEntry } from "@/types/mood";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface MoodListProps {
  entries: MoodEntry[];
}

const MoodList: React.FC<MoodListProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500">아직 작성된 감정일기가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-1">첫 번째 감정일기를 작성해보세요!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">내 감정일기 ({entries.length})</h2>
      {entries.map((entry) => (
        <Card key={entry.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{entry.weatherImage}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {entry.emotionTag}
                  </span>
                  <span className="text-gray-500 text-sm">
                    강도 {entry.intensity}/5
                  </span>
                  <span className="text-gray-400 text-xs ml-auto">
                    {format(entry.createdAt, 'M월 d일 HH:mm', { locale: ko })}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">{entry.text}</p>
                {entry.positiveMessage && (
                  <div className="bg-blue-50 border-l-4 border-blue-200 p-3 rounded-r">
                    <p className="text-blue-800 text-sm italic">💙 {entry.positiveMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MoodList;
