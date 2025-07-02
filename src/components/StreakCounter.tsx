
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { UserStreak } from "@/types/mood";
import { Flame, Trophy, Calendar } from 'lucide-react';

interface StreakCounterProps {
  streak: UserStreak;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  const getStreakMessage = (count: number): string => {
    if (count === 0) return "새로운 시작이에요!";
    if (count < 3) return "좋은 시작이에요!";
    if (count < 7) return "멋진 습관이 되고 있어요!";
    if (count < 14) return "정말 훌륭해요!";
    if (count < 30) return "놀라운 꾸준함이에요!";
    return "감정 마스터가 되셨네요!";
  };

  const getStreakColor = (count: number): string => {
    if (count === 0) return "from-gray-400 to-gray-500";
    if (count < 3) return "from-green-400 to-green-500";
    if (count < 7) return "from-blue-400 to-blue-500";
    if (count < 14) return "from-purple-400 to-purple-500";
    if (count < 30) return "from-pink-400 to-pink-500";
    return "from-yellow-400 to-orange-500";
  };

  return (
    <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getStreakColor(streak.currentStreak)} flex items-center justify-center shadow-lg`}>
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-800">{streak.currentStreak}</span>
                <span className="text-sm text-gray-600">일 연속</span>
              </div>
              <p className="text-xs text-gray-500">{getStreakMessage(streak.currentStreak)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>최고 {streak.longestStreak}일</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>오늘</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
