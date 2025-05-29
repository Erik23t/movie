
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface ModelCarouselProps {
  onVideoClick: () => void;
}

const ModelCarousel = ({ onVideoClick }: ModelCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchedImages, setTouchedImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile: 2 items
      return 10; // Desktop: 10 items
    }
    return 10;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, models.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleImageTouch = (modelId: number) => {
    if (isMobile) {
      setTouchedImages(prev => new Set([...prev, modelId]));
    }
  };

  const handleImageClick = (modelId: number, imageUrl: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isMobile) {
      setSelectedImage(imageUrl);
    } else {
      onVideoClick();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true
  });

  const translatePercentage = (100 / itemsPerView) * currentIndex;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevSlide}
          className="bg-white text-black p-2 sm:p-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white text-black p-2 sm:p-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
      
      <div className="overflow-hidden" {...swipeHandlers}>
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-1"
          style={{ transform: `translateX(-${translatePercentage}%)` }}
        >
          {models.map((model) => (
            <div
              key={model.id}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div 
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onTouchStart={() => handleImageTouch(model.id)}
                onClick={(e) => handleImageClick(model.id, model.image, e)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className={`w-full object-cover transition-all duration-300 ${
                      isMobile && !touchedImages.has(model.id) 
                        ? 'filter grayscale' 
                        : !isMobile 
                          ? 'filter grayscale hover:filter-none' 
                          : ''
                    }`}
                    style={{ width: '152px', height: '250px' }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full">
                      <Play className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-xs sm:text-sm font-semibold text-white">
                    {model.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de visualização completa */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-all duration-300 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage}
              alt="Visualização completa"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelCarousel;
