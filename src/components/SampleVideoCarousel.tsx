
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

const SampleVideoCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    </div>
  );
};

export default SampleVideoCarousel;
