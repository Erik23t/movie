
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from './VideoPlayer';
import ModelCarousel from './ModelCarousel';
import SubscriberCarousel from './SubscriberCarousel';

const MembersArea = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner Principal com Imagem */}
      <div className="relative h-screen bg-gradient-purple-pink overflow-hidden">
        {/* Imagem de fundo do banner */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop&crop=center"
            alt="Banner background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-purple-pink opacity-60"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-8">
          <div className="text-center max-w-4xl animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-netflix-pink-light bg-clip-text text-transparent">
              ÁREA EXCLUSIVA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 px-4">
              Conteúdo premium especialmente selecionado para você
            </p>
            <Button 
              onClick={() => setShowVideo(true)}
              className="bg-gradient-purple-pink hover:bg-gradient-purple-pink-dark text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Reproduzir Conteúdo
            </Button>
          </div>
        </div>
        
        {/* Gradiente de transição */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Carrossel de Modelos Principal */}
      <div className="py-8 sm:py-16 px-4 sm:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-netflix-purple to-netflix-pink bg-clip-text text-transparent">
          Modelos em Destaque
        </h2>
        <ModelCarousel onVideoClick={() => setShowVideo(true)} />
      </div>

      {/* Carrossel Exclusivo para Assinantes */}
      <div className="py-8 sm:py-16 px-4 sm:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-netflix-purple to-netflix-pink bg-clip-text text-transparent">
          Conteúdo Exclusivo VIP
        </h2>
        <SubscriberCarousel />
      </div>

      {/* Player de Vídeo */}
      {showVideo && (
        <VideoPlayer 
          videoUrl="https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
};

export default MembersArea;
