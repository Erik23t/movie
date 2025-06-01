
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface ModelCarouselProps {
  onVideoClick: () => void;
}

const ModelCarousel = ({ onVideoClick }: ModelCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchedImages, setTouchedImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Apenas imagens de modelos, sem vídeo
  const models = [
    {
      id: 1,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 1"
    },
    {
      id: 2,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 2"
    },
    {
      id: 3,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 3"
    },
    {
      id: 4,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 4"
    },
    {
      id: 5,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 5"
    },
    {
      id: 6,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 6"
    },
    {
      id: 7,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 7"
    },
    {
      id: 8,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 8"
    },
    {
      id: 9,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 9"
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
              <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden">
                  <div
                    onTouchStart={() => handleImageTouch(model.id)}
                    onClick={(e) => handleImageClick(model.id, model.image, e)}
                  >
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

      {/* Modal de visualização completa de imagem */}
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
