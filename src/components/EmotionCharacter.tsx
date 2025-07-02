
import React from 'react';
import type { EmotionCharacter } from "@/types/mood";

interface EmotionCharacterProps {
  character: EmotionCharacter;
  isActive?: boolean;
}

const EmotionCharacterComponent: React.FC<EmotionCharacterProps> = ({ character, isActive = false }) => {
  const getCharacterSize = (level: number): string => {
    if (level <= 2) return 'w-12 h-12 text-2xl';
    if (level <= 5) return 'w-16 h-16 text-3xl';
    if (level <= 10) return 'w-20 h-20 text-4xl';
    return 'w-24 h-24 text-5xl';
  };

  const getExperienceProgress = (xp: number): number => {
    const xpNeeded = character.level * 100;
    return Math.min((xp % 100) / 100 * 100, 100);
  };

  return (
    <div className={`relative transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
      <div className={`${getCharacterSize(character.level)} rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center shadow-lg ${isActive ? 'ring-4 ring-white/50' : ''}`}>
        <span className="text-white drop-shadow-lg">{character.appearance}</span>
      </div>
      
      {/* Level indicator */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
        <span className="text-xs font-bold text-white">{character.level}</span>
      </div>
      
      {/* Experience bar */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full bg-black/20 rounded-full h-1">
        <div 
          className="bg-gradient-to-r from-blue-400 to-purple-500 h-1 rounded-full transition-all duration-500"
          style={{ width: `${getExperienceProgress(character.experiencePoints)}%` }}
        />
      </div>
    </div>
  );
};

export default EmotionCharacterComponent;
