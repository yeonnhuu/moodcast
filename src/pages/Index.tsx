
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MoodEntryForm from "@/components/MoodEntryForm";
import MoodList from "@/components/MoodList";
import { MoodEntry, EmotionTag } from "@/types/mood";

const Index = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'write' | 'list'>('write');

  const handleMoodSave = (entry: MoodEntry) => {
    setMoodEntries(prev => [entry, ...prev]);
    setActiveTab('list');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Moodcast</h1>
          <p className="text-gray-600">감정을 기록하고, 긍정하는 감정일기</p>
        </header>

        <div className="mb-6">
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={activeTab === 'write' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('write')}
              className="flex-1"
            >
              감정일기 작성
            </Button>
            <Button
              variant={activeTab === 'list' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('list')}
              className="flex-1"
            >
              내 일기 ({moodEntries.length})
            </Button>
          </div>
        </div>

        {activeTab === 'write' ? (
          <MoodEntryForm onSave={handleMoodSave} />
        ) : (
          <MoodList entries={moodEntries} />
        )}
      </div>
    </div>
  );
};

export default Index;
