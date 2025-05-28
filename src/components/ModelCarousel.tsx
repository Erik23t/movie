
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface ModelCarouselProps {
  onVideoClick: () => void;
}

const ModelCarousel = ({ onVideoClick }: ModelCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Imagens de modelos (usando placeholders realistas)
  const models = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1494790108755-2616b812b647?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 1"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 2"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 3"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 4"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 5"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 6"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 7"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 8"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 9"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face",
      name: "Modelo 10"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, models.length - 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, models.length - 4)) % Math.max(1, models.length - 4));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevSlide}
          className="bg-gradient-purple-pink p-3 rounded-full hover:bg-gradient-purple-pink-dark transition-all duration-300 transform hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-gradient-purple-pink p-3 rounded-full hover:bg-gradient-purple-pink-dark transition-all duration-300 transform hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {models.map((model) => (
            <div
              key={model.id}
              className="w-1/4 flex-shrink-0 px-2"
            >
              <div 
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={onVideoClick}
              >
                <div className="relative overflow-hidden rounded-lg bg-gradient-purple-pink p-1">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-netflix-purple to-netflix-pink bg-clip-text text-transparent">
                    {model.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelCarousel;
