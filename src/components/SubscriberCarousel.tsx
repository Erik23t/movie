
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Lock, Play } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface SubscriberCarouselProps {
  onSubscriptionClick: () => void;
  onVideoClick: () => void;
  isFirstCarousel?: boolean;
}

const SubscriberCarousel = ({ 
  onSubscriptionClick, 
  onVideoClick, 
  isFirstCarousel = false
}: SubscriberCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Usar as imagens do ModelCarousel
  const vipContent = [
    {
      id: 1,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      title: "Conteúdo VIP 1",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 2,
      image: "https://i.postimg.cc/hjMn30c9/2661ed2c-7a46-4c61-bf61-3af5ec1b5199.jpg",
      title: "Conteúdo VIP 2",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 3,
      image: "https://i.postimg.cc/yYf5xXmb/856c8a2c-53c9-4abc-9a5c-f121a6b73552-1.jpg",
      title: "Conteúdo VIP 3",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 4,
      image: "https://i.postimg.cc/8z2Zfyjt/bab136ac-395d-455f-8748-715403cabae6.jpg",
      title: "Conteúdo VIP 4",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 5,
      image: "https://i.postimg.cc/0NSHVTLT/39c9af01-465c-460d-8b98-abf8cda14bc1.jpg",
      title: "Conteúdo VIP 5",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 6,
      image: "https://i.postimg.cc/7LrNZfWR/3dada236-0854-46c0-a3e8-b30dcf9445ac.jpg",
      title: "Conteúdo VIP 6",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 7,
      image: "https://i.postimg.cc/ZRFsSrYj/c45ac9fd-11cf-4ce3-aae9-ec6ba532a40a.jpg",
      title: "Conteúdo VIP 7",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 8,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      title: "Conteúdo VIP 8",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 9,
      image: "https://i.postimg.cc/hjMn30c9/2661ed2c-7a46-4c61-bf61-3af5ec1b5199.jpg",
      title: "Conteúdo VIP 9",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    },
    {
      id: 10,
      image: "https://i.postimg.cc/yYf5xXmb/856c8a2c-53c9-4abc-9a5c-f121a6b73552-1.jpg",
      title: "Conteúdo VIP 10",
      videoUrl: "https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
    }
  ];

  const content = vipContent;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, content.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
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
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{ transform: `translateX(-${translatePercentage}%)` }}
        >
          {content.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 sm:h-80 object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay para primeira fileira com "Assistir Agora" */}
                  {isFirstCarousel ? (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-100 transition-opacity duration-300">
                      <Play className="h-12 w-12 text-white mb-4" />
                      <Star className="h-8 w-8 text-yellow-500 mb-2" />
                      <p className="text-white text-sm font-semibold mb-4 text-center px-4">
                        Conteúdo Exclusivo VIP
                      </p>
                      <button
                        onClick={onVideoClick}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Assistir Agora
                      </button>
                    </div>
                  ) : (
                    /* Overlay para outras fileiras */
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-100 transition-opacity duration-300">
                      <Lock className="h-12 w-12 text-white mb-4" />
                      <Star className="h-8 w-8 text-yellow-500 mb-2" />
                      <p className="text-white text-sm font-semibold mb-4 text-center px-4">
                        Conteúdo Exclusivo VIP
                      </p>
                      <button
                        onClick={onSubscriptionClick}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Assinar Agora
                      </button>
                    </div>
                  )}

                  {/* Hover overlay com play button */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
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

export default SubscriberCarousel;
