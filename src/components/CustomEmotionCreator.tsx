
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomEmotion } from "@/types/mood";
import { Plus, Palette } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CustomEmotionCreatorProps {
  onCreateEmotion: (emotion: CustomEmotion) => void;
}

const CustomEmotionCreator: React.FC<CustomEmotionCreatorProps> = ({ onCreateEmotion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('😊');
  const [selectedColor, setSelectedColor] = useState('from-blue-400 to-purple-500');

  const emotionIcons = ['😊', '😢', '😡', '😰', '😴', '🤔', '😍', '🤗', '😎', '🥺', '😤', '😌'];
  const colorOptions = [
    { name: 'Blue to Purple', value: 'from-blue-400 to-purple-500' },
    { name: 'Pink to Red', value: 'from-pink-400 to-red-500' },
    { name: 'Green to Teal', value: 'from-green-400 to-teal-500' },
    { name: 'Yellow to Orange', value: 'from-yellow-400 to-orange-500' },
    { name: 'Purple to Pink', value: 'from-purple-400 to-pink-500' },
    { name: 'Teal to Blue', value: 'from-teal-400 to-blue-500' },
  ];

  const handleCreate = () => {
    if (!name.trim()) return;
    
    const customEmotion: CustomEmotion = {
      id: Date.now().toString(),
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
    };
    
    onCreateEmotion(customEmotion);
    setName('');
    setSelectedIcon('😊');
    setSelectedColor('from-blue-400 to-purple-500');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-4 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 transition-all duration-200 transform hover:scale-105 hover:shadow-md border-2 border-dashed border-gray-400">
          <div className="flex flex-col items-center gap-2">
            <Plus className="w-6 h-6 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm">커스텀</span>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">나만의 감정 추가</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="emotion-name">감정 이름</Label>
            <Input
              id="emotion-name"
              placeholder="예: 뿌듯함, 설렘, 짜증..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={10}
            />
          </div>
          
          <div>
            <Label>아이콘 선택</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {emotionIcons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`p-2 rounded-lg text-xl hover:bg-gray-100 transition-colors ${
                    selectedIcon === icon ? 'bg-blue-100 ring-2 ring-blue-400' : ''
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label>색상 테마</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all ${
                    selectedColor === color.value ? 'ring-2 ring-offset-2 ring-blue-400' : ''
                  } bg-gradient-to-r ${color.value} text-white`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              취소
            </Button>
            <Button onClick={handleCreate} disabled={!name.trim()} className="flex-1">
              추가하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomEmotionCreator;
