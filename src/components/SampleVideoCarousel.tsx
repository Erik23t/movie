
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Crown } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface SampleVideoCarouselProps {
  onSubscriptionClick: () => void;
}

const SampleVideoCarousel = ({ onSubscriptionClick }: SampleVideoCarouselProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const watchTimeRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const videos = [
    {
      id: 1,
      url: "https://app.vidzflow.com/v/HT18AEHP2v?dq=576&ap=false&muted=true&loop=true&ctp=true&bv=false&piv=false&playsinline=true&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen",
      title: "Vídeo de Amostra 1"
    },
    {
      id: 2,
      url: "https://app.vidzflow.com/v/4sXuMsBWtv?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen",
      title: "Vídeo de Amostra 2"
    },
    {
      id: 3,
      url: "https://app.vidzflow.com/v/2BpuJmrD3T?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen",
      title: "Vídeo de Amostra 3"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Inicia o timer de 3 minutos quando o componente é montado
    watchTimeRef.current = 0;
    timerRef.current = setInterval(() => {
      watchTimeRef.current += 1;
      if (watchTimeRef.current >= 180) { // 3 minutos = 180 segundos
        setShowSubscriptionPrompt(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextVideo,
    onSwipedRight: prevVideo,
    trackMouse: true
  });

  const handleSubscriptionClick = () => {
    setShowSubscriptionPrompt(false);
    onSubscriptionClick();
  };

  const closeSubscriptionPrompt = () => {
    setShowSubscriptionPrompt(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-center relative z-20">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl" {...swipeHandlers}>
            <iframe
              key={videos[currentVideoIndex].id}
              width="100%"
              height="400"
              src={videos[currentVideoIndex].url}
              title={videos[currentVideoIndex].title}
              className="w-full h-64 sm:h-80 md:h-96 aspect-[9/16] sm:aspect-video"
              style={{ 
                aspectRatio: isMobile ? '9/16' : '16/9',
                height: isMobile ? '500px' : '400px'
              }}
              frameBorder="0"
              scrolling="no"
              allow="autoplay; fullscreen"
            />
            
            {/* Botões de navegação */}
            <button
              onClick={prevVideo}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={nextVideo}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Indicadores de página */}
          <div className="flex justify-center mt-4 space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prompt de Assinatura após 3 minutos */}
      {showSubscriptionPrompt && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-black/95 backdrop-blur-lg rounded-2xl p-6 sm:p-8 max-w-md w-full relative border border-yellow-600/30">
            <button
              onClick={closeSubscriptionPrompt}
              className="absolute top-4 right-4 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <Crown className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Conteúdo Exclusivo VIP
              </h3>
              <p className="text-gray-300 mb-6">
                Acesse conteúdo premium e exclusivo com nossa assinatura VIP
              </p>
              
              {/* Oferta especial */}
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-full mb-4">
                <span className="text-sm sm:text-base font-bold">🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!</span>
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-xl text-gray-400 line-through">$30</span>
                <span className="text-3xl font-bold text-white">$12</span>
                <span className="text-lg text-gray-300">/mês</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Depois $30/mês. Cancele a qualquer momento.
              </p>
              
              <button
                onClick={handleSubscriptionClick}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Assinar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleVideoCarousel;
