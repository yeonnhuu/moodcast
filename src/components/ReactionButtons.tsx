
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Users, Sparkles, Shield } from 'lucide-react';
import type { Reaction, ReactionType } from "@/types/mood";

interface ReactionButtonsProps {
  reactions: Reaction[];
  onReact: (reactionType: ReactionType) => void;
  currentUserId: string;
  showReactors?: boolean;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ 
  reactions, 
  onReact, 
  currentUserId,
  showReactors = false 
}) => {
  const reactionTypes = [
    { type: 'empathy' as ReactionType, icon: Users, label: '공감', color: 'text-blue-500' },
    { type: 'heart' as ReactionType, icon: Heart, label: '따뜻함', color: 'text-red-500' },
    { type: 'hug' as ReactionType, icon: Sparkles, label: '포옹', color: 'text-purple-500' },
    { type: 'support' as ReactionType, icon: Shield, label: '응원', color: 'text-green-500' }
  ];

  const getReactionCount = (type: ReactionType) => {
    return reactions.filter(r => r.type === type).length;
  };

  const hasUserReacted = (type: ReactionType) => {
    return reactions.some(r => r.type === type && r.userId === currentUserId);
  };

  const getReactorNames = (type: ReactionType) => {
    return reactions
      .filter(r => r.type === type)
      .map(r => r.userName)
      .slice(0, 3);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {reactionTypes.map(({ type, icon: Icon, label, color }) => {
          const count = getReactionCount(type);
          const hasReacted = hasUserReacted(type);
          
          return (
            <Button
              key={type}
              variant={hasReacted ? 'default' : 'outline'}
              size="sm"
              onClick={() => onReact(type)}
              className={`h-8 ${hasReacted ? 'bg-opacity-20' : ''}`}
            >
              <Icon className={`w-4 h-4 mr-1 ${color}`} />
              <span className="text-xs">{label}</span>
              {count > 0 && (
                <span className="ml-1 text-xs bg-gray-200 px-1 rounded-full">
                  {count}
                </span>
              )}
            </Button>
          );
        })}
      </div>
      
      {showReactors && (
        <div className="space-y-1">
          {reactionTypes.map(({ type, label }) => {
            const reactorNames = getReactorNames(type);
            if (reactorNames.length === 0) return null;
            
            return (
              <div key={type} className="text-xs text-gray-500">
                <span className="font-medium">{label}:</span> {reactorNames.join(', ')}
                {getReactionCount(type) > 3 && ` 외 ${getReactionCount(type) - 3}명`}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReactionButtons;
