import { EmotionTag, WeatherMapping } from "@/types/mood";

const weatherMapping: WeatherMapping = {
  '슬픔': {
    '1': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop'
  },
  '기쁨': {
    '1': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop'
  },
  '분노': {
    '1': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop'
  },
  '외로움': {
    '1': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop'
  },
  '불안': {
    '1': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop'
  },
  '무기력': {
    '1': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop'
  },
  '평온': {
    '1': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop'
  },
  '설렘': {
    '1': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop', 
    '2': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop', 
    '3': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop', 
    '4': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop', 
    '5': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop'
  }
};

const weatherDescriptions: WeatherMapping = {
  '슬픔': {
    '1': '약간 흐린 하늘', '2': '약간 흐린 하늘', '3': '구름 낀 하늘', '4': '비 오는 하늘', '5': '비 오는 하늘'
  },
  '기쁨': {
    '1': '맑은 하늘', '2': '따스한 햇살', '3': '따스한 햇살', '4': '밝은 태양', '5': '밝은 태양'
  },
  '분노': {
    '1': '약간 흐린 하늘', '2': '구름 낀 하늘', '3': '천둥번개', '4': '천둥번개', '5': '번개가 치는 하늘'
  },
  '외로움': {
    '1': '안개 낀 풍경', '2': '안개 낀 풍경', '3': '안개 낀 풍경', '4': '안개 낀 풍경', '5': '안개 낀 풍경'
  },
  '불안': {
    '1': '바람 부는 날', '2': '바람 부는 날', '3': '바람 부는 날', '4': '토네이도', '5': '토네이도'
  },
  '무기력': {
    '1': '구름 낀 하늘', '2': '구름 낀 하늘', '3': '안개 낀 풍경', '4': '안개 낀 풍경', '5': '안개 낀 풍경'
  },
  '평온': {
    '1': '맑은 하늘', '2': '맑은 하늘', '3': '따스한 햇살', '4': '따스한 햇살', '5': '따스한 햇살'
  },
  '설렘': {
    '1': '맑은 하늘', '2': '무지개', '3': '무지개', '4': '무지개', '5': '반짝이는 하늘'
  }
};

const positiveMessages: { [key in EmotionTag]?: string } = {
  '슬픔': "슬픔을 느끼는 것은 당신이 소중한 것들을 사랑할 줄 아는 마음이 있다는 증거예요.",
  '분노': "화가 났다는 건, 당신에게 그만큼 중요한 가치가 있다는 뜻일지도 몰라요.",
  '외로움': "외로움을 느낄 수 있다는 건, 연결을 원하는 따뜻한 마음이 있다는 뜻이에요.",
  '불안': "불안함은 당신이 앞으로 나아가려는 용기의 다른 이름일 수 있어요.",
  '무기력': "오늘은 아무것도 하지 않아도 괜찮아요. 당신이 멈춘 건, 회복의 시작일 수 있어요.",
};

export const getWeatherImage = (emotionTag: EmotionTag, intensity: number): string => {
  return weatherMapping[emotionTag]?.[intensity.toString()] || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop';
};

export const getWeatherDescription = (emotionTag: EmotionTag, intensity: number): string => {
  return weatherDescriptions[emotionTag]?.[intensity.toString()] || '맑은 하늘';
};

export const isNegativeEmotion = (emotionTag: EmotionTag): boolean => {
  return ['슬픔', '분노', '외로움', '불안', '무기력'].includes(emotionTag);
};

export const getPositiveMessage = (emotionTag: EmotionTag): string => {
  return positiveMessages[emotionTag] || "당신의 감정은 소중하고 의미가 있어요.";
};
