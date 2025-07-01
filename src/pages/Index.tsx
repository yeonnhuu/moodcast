
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MoodEntryForm from "@/components/MoodEntryForm";
import MoodList from "@/components/MoodList";
import TodayMoodcast from "@/components/TodayMoodcast";
import { MoodEntry } from "@/types/mood";

const Index = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'today' | 'write' | 'list'>('today');
  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);

  useEffect(() => {
    // 오늘의 마지막 기분 기록을 가져오기
    const today = new Date().toDateString();
    const todayEntries = moodEntries.filter(entry => 
      entry.createdAt.toDateString() === today
    );
    if (todayEntries.length > 0) {
      setTodayMood(todayEntries[0]);
    }
  }, [moodEntries]);

  const handleMoodSave = (entry: MoodEntry) => {
    setMoodEntries(prev => [entry, ...prev]);
    setTodayMood(entry);
    setActiveTab('today');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* 헤더 - 날씨 앱 스타일 */}
      <div className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Moodcast
            </h1>
            <p className="text-xs text-gray-600 mt-1">오늘의 기분 날씨</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* 탭 네비게이션 - 날씨 앱 스타일 */}
        <div className="mb-6">
          <div className="flex bg-white/50 backdrop-blur-sm rounded-2xl p-1 shadow-sm">
            <Button
              variant={activeTab === 'today' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('today')}
              className="flex-1 rounded-xl text-sm"
            >
              오늘 날씨
            </Button>
            <Button
              variant={activeTab === 'write' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('write')}
              className="flex-1 rounded-xl text-sm"
            >
              기분 기록
            </Button>
            <Button
              variant={activeTab === 'list' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('list')}
              className="flex-1 rounded-xl text-sm"
            >
              날씨 히스토리
            </Button>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        {activeTab === 'today' && (
          <TodayMoodcast 
            todayMood={todayMood} 
            onWriteClick={() => setActiveTab('write')}
          />
        )}
        
        {activeTab === 'write' && (
          <MoodEntryForm onSave={handleMoodSave} />
        )}
        
        {activeTab === 'list' && (
          <MoodList entries={moodEntries} />
        )}
      </div>
    </div>
  );
};

export default Index;
