
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from './VideoPlayer';
import ModelCarousel from './ModelCarousel';

const MembersArea = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner Principal */}
      <div className="relative h-screen bg-gradient-purple-pink overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-8">
          <div className="text-center max-w-4xl animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-netflix-pink-light bg-clip-text text-transparent">
              ÁREA EXCLUSIVA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Conteúdo premium especialmente selecionado para você
            </p>
            <Button 
              onClick={() => setShowVideo(true)}
              className="bg-gradient-purple-pink hover:bg-gradient-purple-pink-dark text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Play className="mr-2 h-6 w-6" />
              Reproduzir Conteúdo
            </Button>
          </div>
        </div>
        
        {/* Gradiente de transição */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Carrossel de Modelos */}
      <div className="py-16 px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-netflix-purple to-netflix-pink bg-clip-text text-transparent">
          Modelos em Destaque
        </h2>
        <ModelCarousel onVideoClick={() => setShowVideo(true)} />
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
