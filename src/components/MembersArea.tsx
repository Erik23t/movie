
import React, { useState, useEffect } from 'react';
import { Play, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import VideoPlayer from './VideoPlayer';
import ModelCarousel from './ModelCarousel';
import SubscriberCarousel from './SubscriberCarousel';
import SubscriptionPlans from './SubscriptionPlans';
import SampleVideoCarousel from './SampleVideoCarousel';
import TestimonialsSection from './TestimonialsSection';
import TopBar from './TopBar';
import FullscreenVideoPlayer from './FullscreenVideoPlayer';
import LoginRequiredModal from './LoginRequiredModal';
import AuthModal from './AuthModal';
import { TestimonialsSection as TestimonialsMarquee } from './ui/testimonials-with-marquee';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

const MembersArea = () => {
  const { t } = useAutoTranslation();
  const [showVideo, setShowVideo] = useState(false);
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const [showFullscreenVideo, setShowFullscreenVideo] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar se o usuário está logado
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleVideoClick = (videoUrl: string) => {
    if (!user) {
      setShowLoginRequired(true);
      return;
    }
    setCurrentVideoUrl(videoUrl);
    setShowFullscreenVideo(true);
  };

  const handleModelCarouselVideoClick = () => {
    handleVideoClick("https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4");
  };

  const handleVipVideoClick = () => {
    if (!user) {
      setShowLoginRequired(true);
      return;
    }
    // Para usuários logados, permitir acesso aos vídeos VIP
    setCurrentVideoUrl("https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4");
    setShowFullscreenVideo(true);
  };

  const handleSampleVideoClick = () => {
    setShowSubscriptionPlans(true);
  };

  const handleSubscriptionClick = () => {
    if (!user) {
      setShowLoginRequired(true);
      return;
    }
    setShowSubscriptionPlans(true);
  };

  const handleLoginRequiredClose = () => {
    setShowLoginRequired(false);
  };

  const handleLoginClick = () => {
    setShowLoginRequired(false);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  // Dados dos testemunhos
  const testimonials = [
    {
      author: {
        name: "Carlos Rodriguez",
        handle: "@carlostech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "Conteúdo incrível! Vale cada centavo da assinatura. Qualidade excepcional e sempre conteúdo novo."
    },
    {
      author: {
        name: "Michael Johnson",
        handle: "@mjohnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      text: "A melhor plataforma que já usei. Interface perfeita e conteúdo de alta qualidade sempre atualizado."
    },
    {
      author: {
        name: "João Silva",
        handle: "@joaosilva",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      text: "Simplesmente fantástico! Recomendo para todos que buscam conteúdo premium de verdade."
    },
    {
      author: {
        name: "David Wilson",
        handle: "@davidwtech",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
      },
      text: "Excelente custo-benefício. O suporte é incrível e o conteúdo sempre surpreende."
    },
    {
      author: {
        name: "André Müller",
        handle: "@andremuller",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      },
      text: "Qualidade incomparável! Cada vídeo é uma experiência única. Vale muito a pena."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <TopBar onSubscriptionClick={handleSubscriptionClick} />
      
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
                onClick={() => handleVideoClick("https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4")}
                className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                {t('playContent')}
              </Button>
              
              <Button 
                onClick={handleSubscriptionClick}
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
        <ModelCarousel onVideoClick={handleModelCarouselVideoClick} onSubscriptionClick={handleSubscriptionClick} />
      </div>

      {/* Vídeo Principal Centralizado com Efeito de Sombreamento */}
      <div className="py-8 sm:py-16 px-4 sm:px-8 bg-gradient-to-b from-black via-gray-900 to-black relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10"></div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-white relative z-20">
          {t('sampleContent')}
        </h2>
        <SampleVideoCarousel onSubscriptionClick={handleSampleVideoClick} />
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
            onClick={handleSubscriptionClick}
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
        
        <SubscriberCarousel 
          onSubscriptionClick={handleSubscriptionClick} 
          onVideoClick={handleVipVideoClick}
          isFirstCarousel={true}
        />
      </div>

      {/* Testemunhos dos Assinantes */}
      <TestimonialsMarquee
        title="O que nossos membros VIP dizem"
        description="Junte-se a milhares de usuários satisfeitos que já descobriram o melhor conteúdo premium"
        testimonials={testimonials}
      />

      {/* Player de Vídeo */}
      {showVideo && (
        <VideoPlayer 
          videoUrl="https://d29xs8vub7bm1d.cloudfront.net/Psychological%20_hack_%20-%201280x720%202604K.mp4"
          onClose={() => setShowVideo(false)}
        />
      )}

      {/* Player de Vídeo em Tela Cheia */}
      {showFullscreenVideo && (
        <FullscreenVideoPlayer 
          videoUrl={currentVideoUrl}
          onClose={() => setShowFullscreenVideo(false)}
        />
      )}

      {/* Modal de Login Necessário */}
      {showLoginRequired && (
        <LoginRequiredModal
          onClose={handleLoginRequiredClose}
          onLoginClick={handleLoginClick}
        />
      )}

      {/* Modal de Autenticação */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
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
