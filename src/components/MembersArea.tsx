
import React, { useState } from 'react';
import { Play, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from './VideoPlayer';
import ModelCarousel from './ModelCarousel';
import SubscriberCarousel from './SubscriberCarousel';
import SubscriptionPlans from './SubscriptionPlans';
import TestimonialsSection from './TestimonialsSection';

const MembersArea = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner Principal com Imagem */}
      <div className="relative h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Imagem de fundo do banner */}
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg"
            alt="Banner background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-8">
          <div className="text-center max-w-4xl animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              ÁREA EXCLUSIVA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 px-4">
              Conteúdo premium especialmente selecionado para você
            </p>
            
            {/* Botões do Banner */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button 
                onClick={() => setShowVideo(true)}
                className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Reproduzir Conteúdo
              </Button>
              
              <Button 
                onClick={() => setShowSubscriptionPlans(true)}
                className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 border border-gray-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 animate-[pulse_3s_ease-in-out_infinite]"
              >
                <Crown className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Assinar VIP
              </Button>
            </div>
          </div>
        </div>
        
        {/* Gradiente de transição */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Carrossel de Modelos Principal - Espaçamento reduzido ainda mais no mobile */}
      <div className="pt-1 pb-2 sm:pt-4 sm:pb-8 px-4 sm:px-8 -mt-16 sm:-mt-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center text-white">
          Modelos em Destaque
        </h2>
        <ModelCarousel onVideoClick={() => setShowVideo(true)} />
      </div>

      {/* Vídeo Principal Centralizado */}
      <div className="py-8 sm:py-16 px-4 sm:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
          Conteúdo de Amostra
        </h2>
        <div className="flex justify-center">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="400"
                src="https://app.vidzflow.com/v/HT18AEHP2v?dq=576&ap=false&muted=true&loop=true&ctp=true&bv=false&piv=false&playsinline=true&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen"
                title="Vídeo de Amostra"
                className="w-full h-64 sm:h-80 md:h-96"
                frameBorder="0"
                scrolling="no"
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carrossel Exclusivo para Assinantes */}
      <div className="py-8 sm:py-16 px-4 sm:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
          Conteúdo Exclusivo VIP
        </h2>
        <SubscriberCarousel onSubscriptionClick={() => setShowSubscriptionPlans(true)} />
      </div>

      {/* Seção de Comentários */}
      <div className="py-8 sm:py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <TestimonialsSection />
      </div>

      {/* Player de Vídeo */}
      {showVideo && (
        <VideoPlayer 
          videoUrl="https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
          onClose={() => setShowVideo(false)}
        />
      )}

      {/* Planos de Assinatura */}
      {showSubscriptionPlans && (
        <SubscriptionPlans onClose={() => setShowSubscriptionPlans(false)} />
      )}
    </div>
  );
};

export default MembersArea;
