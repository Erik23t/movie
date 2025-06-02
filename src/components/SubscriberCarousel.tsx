import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lock, Crown, Clock } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface SubscriberCarouselProps {
  onSubscriptionClick: () => void;
}

const SubscriberCarousel = ({ onSubscriptionClick }: SubscriberCarouselProps) => {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [currentIndex5, setCurrentIndex5] = useState(0);

  // Primeira fileira - conteúdo exclusivo existente
  const exclusiveContent1 = [
    {
      id: 1,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 1"
    },
    {
      id: 2,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 2"
    },
    {
      id: 3,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 3"
    },
    {
      id: 4,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 4"
    },
    {
      id: 5,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 5"
    },
    {
      id: 6,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 6"
    },
    {
      id: 7,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 7"
    },
    {
      id: 8,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 8"
    },
    {
      id: 9,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 9"
    },
    {
      id: 10,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Exclusivo 10"
    }
  ];

  // Segunda fileira - novo conteúdo VIP
  const exclusiveContent2 = [
    {
      id: 11,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 1"
    },
    {
      id: 12,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 2"
    },
    {
      id: 13,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 3"
    },
    {
      id: 14,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 4"
    },
    {
      id: 15,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 5"
    },
    {
      id: 16,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 6"
    },
    {
      id: 17,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 7"
    },
    {
      id: 18,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 8"
    },
    {
      id: 19,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 9"
    },
    {
      id: 20,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Premium 10"
    }
  ];

  // Terceira fileira - mais conteúdo VIP
  const exclusiveContent3 = [
    {
      id: 21,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 1"
    },
    {
      id: 22,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 2"
    },
    {
      id: 23,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 3"
    },
    {
      id: 24,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 4"
    },
    {
      id: 25,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 5"
    },
    {
      id: 26,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 6"
    },
    {
      id: 27,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 7"
    },
    {
      id: 28,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 8"
    },
    {
      id: 29,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 9"
    },
    {
      id: 30,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Elite 10"
    }
  ];

  // Quarta fileira - novo conteúdo VIP
  const exclusiveContent4 = [
    {
      id: 31,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 1"
    },
    {
      id: 32,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 2"
    },
    {
      id: 33,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 3"
    },
    {
      id: 34,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 4"
    },
    {
      id: 35,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 5"
    },
    {
      id: 36,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 6"
    },
    {
      id: 37,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 7"
    },
    {
      id: 38,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 8"
    },
    {
      id: 39,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 9"
    },
    {
      id: 40,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Platinum 10"
    }
  ];

  // Quinta fileira - mais conteúdo VIP
  const exclusiveContent5 = [
    {
      id: 41,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 1"
    },
    {
      id: 42,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 2"
    },
    {
      id: 43,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 3"
    },
    {
      id: 44,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 4"
    },
    {
      id: 45,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 5"
    },
    {
      id: 46,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 6"
    },
    {
      id: 47,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 7"
    },
    {
      id: 48,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 8"
    },
    {
      id: 49,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 9"
    },
    {
      id: 50,
      image: "https://i.postimg.cc/fyjgwkM7/Flux-Dev-A-stunning-3-D-render-of-a-magical-padlock-floating-in-1.jpg",
      name: "Diamond 10"
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

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex1 = Math.max(0, exclusiveContent1.length - itemsPerView);
  const maxIndex2 = Math.max(0, exclusiveContent2.length - itemsPerView);
  const maxIndex3 = Math.max(0, exclusiveContent3.length - itemsPerView);

  const maxIndex4 = Math.max(0, exclusiveContent4.length - itemsPerView);
  const maxIndex5 = Math.max(0, exclusiveContent5.length - itemsPerView);

  const nextSlide1 = () => {
    setCurrentIndex1((prev) => (prev >= maxIndex1 ? 0 : prev + 1));
  };

  const prevSlide1 = () => {
    setCurrentIndex1((prev) => (prev <= 0 ? maxIndex1 : prev - 1));
  };

  const nextSlide2 = () => {
    setCurrentIndex2((prev) => (prev >= maxIndex2 ? 0 : prev + 1));
  };

  const prevSlide2 = () => {
    setCurrentIndex2((prev) => (prev <= 0 ? maxIndex2 : prev - 1));
  };

  const nextSlide3 = () => {
    setCurrentIndex3((prev) => (prev >= maxIndex3 ? 0 : prev + 1));
  };

  const prevSlide3 = () => {
    setCurrentIndex3((prev) => (prev <= 0 ? maxIndex3 : prev - 1));
  };

  const nextSlide4 = () => {
    setCurrentIndex4((prev) => (prev >= maxIndex4 ? 0 : prev + 1));
  };

  const prevSlide4 = () => {
    setCurrentIndex4((prev) => (prev <= 0 ? maxIndex4 : prev - 1));
  };

  const nextSlide5 = () => {
    setCurrentIndex5((prev) => (prev >= maxIndex5 ? 0 : prev + 1));
  };

  const prevSlide5 = () => {
    setCurrentIndex5((prev) => (prev <= 0 ? maxIndex5 : prev - 1));
  };

  const swipeHandlers1 = useSwipeable({
    onSwipedLeft: nextSlide1,
    onSwipedRight: prevSlide1,
    trackMouse: true
  });

  const swipeHandlers2 = useSwipeable({
    onSwipedLeft: nextSlide2,
    onSwipedRight: prevSlide2,
    trackMouse: true
  });

  const swipeHandlers3 = useSwipeable({
    onSwipedLeft: nextSlide3,
    onSwipedRight: prevSlide3,
    trackMouse: true
  });

  const swipeHandlers4 = useSwipeable({
    onSwipedLeft: nextSlide4,
    onSwipedRight: prevSlide4,
    trackMouse: true
  });

  const swipeHandlers5 = useSwipeable({
    onSwipedLeft: nextSlide5,
    onSwipedRight: prevSlide5,
    trackMouse: true
  });

  const renderCarousel = (
    content: any[], 
    currentIndex: number, 
    nextSlide: () => void, 
    prevSlide: () => void, 
    swipeHandlers: any,
    title: string,
    crownColor: string,
    isSpecial?: boolean
  ) => {
    const translatePercentage = (100 / itemsPerView) * currentIndex;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
            {title}
          </h3>
          {isSpecial && (
            <div className="flex items-center ml-4">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-yellow-500 font-bold text-sm">
                Promoção: $79/ano
              </span>
            </div>
          )}
        </div>
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
              {content.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div 
                    className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={onSubscriptionClick}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full object-cover filter grayscale"
                        style={{ width: '152px', height: '250px' }}
                      />
                      
                      {/* Ícone da coroa colorida no canto direito */}
                      <div className="absolute top-2 right-2">
                        <Crown className={`h-4 w-4 sm:h-5 sm:w-5 ${crownColor}`} />
                      </div>
                      
                      {/* Overlay escuro para dar efeito de bloqueado */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center">
                          <div className="bg-white text-black p-2 sm:p-3 rounded-full mb-1 sm:mb-2 mx-auto w-fit">
                            <Lock className="h-4 w-4 sm:h-6 sm:w-6" />
                          </div>
                          <p className="text-white text-xs font-semibold">VIP</p>
                        </div>
                      </div>
                      {/* Efeito hover */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">Exclusivo VIP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Primeira fileira - Conteúdo Exclusivo VIP com coroa branca */}
      {renderCarousel(
        exclusiveContent1, 
        currentIndex1, 
        nextSlide1, 
        prevSlide1, 
        swipeHandlers1,
        "Conteúdo Exclusivo VIP",
        "text-white"
      )}

      {/* Segunda fileira - Conteúdo Premium com coroa prata */}
      {renderCarousel(
        exclusiveContent2, 
        currentIndex2, 
        nextSlide2, 
        prevSlide2, 
        swipeHandlers2,
        "Coleção Premium",
        "text-gray-400"
      )}

      {/* Terceira fileira - Conteúdo Elite com coroa laranja e destaque especial */}
      {renderCarousel(
        exclusiveContent3, 
        currentIndex3, 
        nextSlide3, 
        prevSlide3, 
        swipeHandlers3,
        "Coleção Elite",
        "text-orange-500",
        true
      )}

      {/* Quarta fileira - Coleção Platinum */}
      {renderCarousel(
        exclusiveContent4, 
        currentIndex4, 
        nextSlide4, 
        prevSlide4, 
        swipeHandlers4,
        "Coleção Platinum",
        "text-orange-500"
      )}

      {/* Quinta fileira - Coleção Diamond */}
      {renderCarousel(
        exclusiveContent5, 
        currentIndex5, 
        nextSlide5, 
        prevSlide5, 
        swipeHandlers5,
        "Coleção Diamond",
        "text-orange-500"
      )}
      
      {/* Mensagem de assinatura */}
      <div className="mt-6 sm:mt-8 text-center">
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-4 sm:p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold mb-2">
            Conteúdo Exclusivo VIP
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            Acesse conteúdo premium e exclusivo com nossa assinatura VIP
          </p>
          <button 
            onClick={onSubscriptionClick}
            className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
          >
            Assinar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriberCarousel;
