
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MoodEntryForm from "@/components/MoodEntryForm";
import MoodList from "@/components/MoodList";
import TodayMoodcast from "@/components/TodayMoodcast";
import StreakCounter from "@/components/StreakCounter";
import { MoodEntry, UserStreak, EmotionCharacter, CustomEmotion } from "@/types/mood";

const Index = () => {
  const navigate = useNavigate();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'today' | 'write' | 'list'>('today');
  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);
  const [allTodayEntries, setAllTodayEntries] = useState<MoodEntry[]>([]);
  const [userStreak, setUserStreak] = useState<UserStreak>({
    currentStreak: 0,
    longestStreak: 0,
    lastEntryDate: null,
  });
  const [emotionCharacters, setEmotionCharacters] = useState<EmotionCharacter[]>([]);
  const [customEmotions, setCustomEmotions] = useState<CustomEmotion[]>([]);

  // Initialize emotion characters
  useEffect(() => {
    const defaultEmotions = ['기쁨', '슬픔', '분노', '외로움', '불안', '무기력', '평온', '설렘'];
    const defaultCharacters = defaultEmotions.map(emotion => ({
      emotionTag: emotion,
      level: 1,
      experiencePoints: 0,
      appearance: getEmotionCharacter(emotion),
    }));
    setEmotionCharacters(defaultCharacters);
  }, []);

  // Update streak and today's mood
  useEffect(() => {
    const today = new Date().toDateString();
    const todayEntries = moodEntries.filter(entry => 
      entry.createdAt.toDateString() === today
    );
    
    setAllTodayEntries(todayEntries);
    
    if (todayEntries.length > 0) {
      // Set the most recent entry as today's mood
      const mostRecent = todayEntries.reduce((latest, current) => 
        current.createdAt > latest.createdAt ? current : latest
      );
      setTodayMood(mostRecent);
      updateStreak(mostRecent.createdAt);
    } else {
      setTodayMood(null);
    }
  }, [moodEntries]);

  const getEmotionCharacter = (emotion: string): string => {
    const characters = {
      '기쁨': '🌟',
      '슬픔': '🌧️',
      '분노': '⚡',
      '외로움': '🌙',
      '불안': '🌪️',
      '무기력': '😴',
      '평온': '🕊️',
      '설렘': '🦋',
    };
    return characters[emotion] || '💫';
  };

  const updateStreak = (entryDate: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    setUserStreak(prev => {
      const lastEntry = prev.lastEntryDate;
      const entryDateStr = entryDate.toDateString();
      const todayStr = today.toDateString();
      const yesterdayStr = yesterday.toDateString();
      
      if (!lastEntry) {
        return {
          currentStreak: 1,
          longestStreak: Math.max(1, prev.longestStreak),
          lastEntryDate: entryDate,
        };
      }
      
      const lastEntryStr = lastEntry.toDateString();
      
      if (entryDateStr === todayStr && lastEntryStr === yesterdayStr) {
        const newStreak = prev.currentStreak + 1;
        return {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, prev.longestStreak),
          lastEntryDate: entryDate,
        };
      } else if (entryDateStr === todayStr && lastEntryStr !== todayStr) {
        return {
          currentStreak: 1,
          longestStreak: prev.longestStreak,
          lastEntryDate: entryDate,
        };
      }
      
      return prev;
    });
  };

  const updateEmotionCharacter = (emotionTag: string, intensity: number) => {
    setEmotionCharacters(prev => 
      prev.map(char => {
        if (char.emotionTag === emotionTag) {
          const newXP = char.experiencePoints + (intensity * 20);
          const newLevel = Math.floor(newXP / 100) + 1;
          return {
            ...char,
            experiencePoints: newXP,
            level: newLevel,
          };
        }
        return char;
      })
    );
  };

  const handleMoodSave = (entry: MoodEntry) => {
    setMoodEntries(prev => [entry, ...prev]);
    setActiveTab('today');
    
    // Update character if it's a default emotion
    if (!entry.isCustomEmotion) {
      updateEmotionCharacter(entry.emotionTag, entry.intensity);
    }
  };

  const handleCustomEmotionCreate = (emotion: CustomEmotion) => {
    setCustomEmotions(prev => [...prev, emotion]);
    
    // Add character for this custom emotion
    const newCharacter: EmotionCharacter = {
      emotionTag: emotion.name,
      level: 1,
      experiencePoints: 0,
      appearance: emotion.icon,
    };
    setEmotionCharacters(prev => [...prev, newCharacter]);
  };

  const handleMoodUpdate = (updatedEntry: MoodEntry) => {
    setMoodEntries(prev => 
      prev.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    
    const today = new Date().toDateString();
    if (updatedEntry.createdAt.toDateString() === today) {
      setTodayMood(updatedEntry);
    }
  };

  const handleMoodDelete = (entryId: string) => {
    setMoodEntries(prev => prev.filter(entry => entry.id !== entryId));
    
    if (todayMood?.id === entryId) {
      const today = new Date().toDateString();
      const remainingTodayEntries = moodEntries.filter(entry => 
        entry.id !== entryId && entry.createdAt.toDateString() === today
      );
      setTodayMood(remainingTodayEntries.length > 0 ? remainingTodayEntries[0] : null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Enhanced Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Moodcast
              </h1>
              <p className="text-xs text-gray-600 mt-1">감정을 기록하고 성장하세요</p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/calendar')}
                className="p-2 hover:bg-green-100"
                title="감정 캘린더"
              >
                <Calendar className="w-4 h-4 text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/community')}
                className="p-2 hover:bg-purple-100"
                title="커뮤니티 피드"
              >
                <Globe className="w-4 h-4 text-purple-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/shared-diaries')}
                className="p-2 hover:bg-blue-100"
                title="친구 일기"
              >
                <Users className="w-4 h-4 text-blue-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Streak Counter */}
        <StreakCounter streak={userStreak} />

        {/* Tab Navigation */}
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
              감정 기록
            </Button>
            <Button
              variant={activeTab === 'list' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('list')}
              className="flex-1 rounded-xl text-sm"
            >
              히스토리
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'today' && (
          <TodayMoodcast 
            todayMood={todayMood} 
            onWriteClick={() => setActiveTab('write')}
            emotionCharacters={emotionCharacters}
            allTodayEntries={allTodayEntries}
          />
        )}
        
        {activeTab === 'write' && (
          <MoodEntryForm 
            onSave={handleMoodSave}
            emotionCharacters={emotionCharacters}
            customEmotions={customEmotions}
            onCreateCustomEmotion={handleCustomEmotionCreate}
          />
        )}
        
        {activeTab === 'list' && (
          <MoodList 
            entries={moodEntries} 
            onUpdate={handleMoodUpdate}
            onDelete={handleMoodDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
