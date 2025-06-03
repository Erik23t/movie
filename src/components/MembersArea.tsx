
import React, { useState } from 'react';
import { Play, Crown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from './VideoPlayer';
import ModelCarousel from './ModelCarousel';
import SubscriberCarousel from './SubscriberCarousel';
import SubscriptionPlans from './SubscriptionPlans';
import SampleVideoCarousel from './SampleVideoCarousel';
import TestimonialsSection from './TestimonialsSection';
import TopBar from './TopBar';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

const MembersArea = () => {
  const { t } = useAutoTranslation();
  const [showVideo, setShowVideo] = useState(false);
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <TopBar onSubscriptionClick={() => setShowSubscriptionPlans(true)} />
      
      {/* Banner Principal sem Imagem de Fundo */}
      <div className="relative h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden pt-16">
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-8">
          <div className="text-center max-w-4xl animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('exclusiveContent')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 px-4">
              {t('exclusiveContentDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button 
                onClick={() => setShowVideo(true)}
                className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                {t('playContent')}
              </Button>
              
              <Button 
                onClick={() => setShowSubscriptionPlans(true)}
                className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 border border-gray-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Crown className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                {t('subscribeVip')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Carrossel de Modelos Principal */}
      <div className="pt-1 pb-2 sm:pt-4 sm:pb-8 px-4 sm:px-8 -mt-16 sm:-mt-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center text-white">
          {t('featuredModels')}
        </h2>
        <ModelCarousel onVideoClick={() => setShowVideo(true)} onSubscriptionClick={() => setShowSubscriptionPlans(true)} />
      </div>

      {/* Vídeo Principal Centralizado com Efeito de Sombreamento */}
      <div className="py-8 sm:py-16 px-4 sm:px-8 bg-gradient-to-b from-black via-gray-900 to-black relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10"></div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-white relative z-20">
          {t('sampleContent')}
        </h2>
        <SampleVideoCarousel onSubscriptionClick={() => setShowSubscriptionPlans(true)} />
      </div>

      {/* Carrossel Exclusivo para Assinantes */}
      <div className="py-8 sm:py-16 px-4 sm:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center text-white">
          {t('exclusiveContentVip')}
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 text-center mb-6 sm:mb-8">
          {t('premiumAccess')}
        </p>
        
        {/* Preço com desconto */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => setShowSubscriptionPlans(true)}
            className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-full mb-4 hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <span className="text-lg sm:text-xl font-bold">{t('specialOffer')}</span>
          </button>
          <div className="flex items-center justify-center gap-4">
            <span className="text-2xl sm:text-3xl text-gray-400 line-through">$30</span>
            <span className="text-4xl sm:text-5xl font-bold text-white">$12</span>
            <span className="text-lg sm:text-xl text-gray-300">/mês</span>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            {t('afterPrice')}
          </p>
        </div>
        
        <SubscriberCarousel onSubscriptionClick={() => setShowSubscriptionPlans(true)} />

        {/* Coleção Elite com destaque especial */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-orange-500" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t('eliteCollection')}
              </h2>
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
            
            {/* Oferta especial da Coleção Elite */}
            <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border border-orange-500/30 rounded-2xl p-6 max-w-md mx-auto mb-6">
              <div className="text-orange-400 font-bold text-lg mb-2">
                🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!
              </div>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-2xl text-gray-400 line-through">$345</span>
                <span className="text-4xl font-bold text-orange-400">$79</span>
                <span className="text-lg text-gray-300">/ano</span>
              </div>
              <p className="text-sm text-gray-400">
                Depois $30/mês. Cancele a qualquer momento.
              </p>
            </div>
          </div>
          
          <SubscriberCarousel 
            onSubscriptionClick={() => setShowSubscriptionPlans(true)} 
            collectionType="elite"
          />
        </div>

        {/* Coleção Premium */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-gray-400" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t('premiumCollection')}
              </h2>
            </div>
          </div>
          
          <SubscriberCarousel 
            onSubscriptionClick={() => setShowSubscriptionPlans(true)} 
            collectionType="premium"
          />
        </div>
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
