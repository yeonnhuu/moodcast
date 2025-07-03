
import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock, Users, Globe } from 'lucide-react';
import type { VisibilityLevel } from "@/types/mood";

interface VisibilitySelectorProps {
  visibility: VisibilityLevel;
  onVisibilityChange: (visibility: VisibilityLevel) => void;
}

const VisibilitySelector: React.FC<VisibilitySelectorProps> = ({ 
  visibility, 
  onVisibilityChange 
}) => {
  const visibilityOptions = [
    {
      value: 'private' as VisibilityLevel,
      label: '나만 보기',
      icon: Lock,
      description: '나만 볼 수 있어요',
      color: 'bg-gray-500'
    },
    {
      value: 'friends' as VisibilityLevel,
      label: '친구와 공유',
      icon: Users,
      description: '선택한 친구들과 공유',
      color: 'bg-blue-500'
    },
    {
      value: 'public' as VisibilityLevel,
      label: '모두 공개',
      icon: Globe,
      description: '모든 사람이 볼 수 있어요',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700">공개 설정</div>
      <div className="grid grid-cols-1 gap-2">
        {visibilityOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              variant={visibility === option.value ? 'default' : 'outline'}
              onClick={() => onVisibilityChange(option.value)}
              className="h-auto p-3 justify-start"
            >
              <div className={`w-8 h-8 rounded-full ${option.color} flex items-center justify-center mr-3`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default VisibilitySelector;
