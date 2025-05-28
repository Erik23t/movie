
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';

interface SubscriberCarouselProps {
  onSubscriptionClick: () => void;
}

const SubscriberCarousel = ({ onSubscriptionClick }: SubscriberCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Imagens em preto e branco para conteúdo exclusivo
  const exclusiveContent = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 1"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 2"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 3"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 4"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 5"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 6"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 7"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 8"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 9"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center&sat=-100",
      name: "Exclusivo 10"
    }
  ];

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile: 2 items
      if (window.innerWidth < 768) return 3; // Tablet: 3 items
      if (window.innerWidth < 1024) return 4; // Small desktop: 4 items
      return 5; // Large desktop: 5 items
    }
    return 5;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, exclusiveContent.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  };

  const translatePercentage = (100 / itemsPerView) * currentIndex;

  const handleSubscriberClick = () => {
    onSubscriptionClick();
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevSlide}
          className="bg-gradient-purple-pink p-2 sm:p-3 rounded-full hover:bg-gradient-purple-pink-dark transition-all duration-300 transform hover:scale-110 z-10"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-gradient-purple-pink p-2 sm:p-3 rounded-full hover:bg-gradient-purple-pink-dark transition-all duration-300 transform hover:scale-110 z-10"
          disabled={currentIndex === maxIndex}
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${translatePercentage}%)` }}
        >
          {exclusiveContent.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 px-1 sm:px-2`}
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div 
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={handleSubscriberClick}
              >
                <div className="relative overflow-hidden rounded-lg bg-gradient-purple-pink p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full object-cover rounded-lg filter grayscale"
                    style={{ width: '112px', height: '156.8px' }}
                  />
                  {/* Overlay escuro para dar efeito de bloqueado */}
                  <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-gradient-purple-pink p-2 sm:p-3 rounded-full mb-1 sm:mb-2 mx-auto w-fit">
                        <Lock className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <p className="text-white text-xs font-semibold">VIP</p>
                    </div>
                  </div>
                  {/* Efeito hover */}
                  <div className="absolute inset-0 bg-gradient-purple-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-netflix-purple to-netflix-pink bg-clip-text text-transparent">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Exclusivo VIP</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mensagem de assinatura */}
      <div className="mt-6 sm:mt-8 text-center">
        <div className="bg-gradient-purple-pink p-4 sm:p-6 rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Conteúdo Exclusivo VIP
          </h3>
          <p className="text-sm sm:text-base text-gray-200 mb-4">
            Acesse conteúdo premium e exclusivo com nossa assinatura VIP
          </p>
          <button 
            onClick={onSubscriptionClick}
            className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Assinar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriberCarousel;
