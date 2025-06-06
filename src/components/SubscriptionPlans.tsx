import React from 'react';
import { Button } from '@/components/ui/button';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

interface SubscriptionPlansProps {
  onClose: () => void;
}

const testimonials = [
  {
    name: 'Maria Silva',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
    comment: 'A assinatura VIP mudou a forma como aproveito meu tempo livre. Conteúdo exclusivo e de alta qualidade!'
  },
  {
    name: 'João Alves',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 4,
    comment: 'Ótimo custo-benefício! O acesso ilimitado e a qualidade HD valem cada centavo.'
  },
  {
    name: 'Carla Zambelli',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
    comment: 'Finalmente encontrei um serviço de assinatura que oferece conteúdo diversificado e sem anúncios irritantes.'
  },
  {
    name: 'Ricardo Pereira',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    rating: 4,
    comment: 'Acesso móvel é perfeito para quem está sempre em movimento. Consigo assistir meus conteúdos favoritos em qualquer lugar.'
  },
  {
    name: 'Ana Clara',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    rating: 5,
    comment: 'A possibilidade de cancelar a assinatura a qualquer momento me dá segurança para experimentar novos conteúdos.'
  },
  {
    name: 'Bruno Gagliasso',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    rating: 5,
    comment: 'Conteúdo exclusivo e de alta qualidade, recomendo a todos!'
  }
];

const SubscriptionPlans = ({ onClose }: SubscriptionPlansProps) => {
  const { t } = useAutoTranslation();

  const plan = {
    name: t('vipPlan'),
    price: '$12',
    originalPrice: '$30',
    period: t('month'),
    features: [
      t('unlimitedAccess'),
      t('hdQuality'),
      t('noAds'),
      t('mobileAccess'),
      t('cancelAnytime')
    ],
    highlight: true
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-black border border-orange-500 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="sr-only">Close</span>
        </Button>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('subscriptionPlans')}
          </h2>
          <p className="text-gray-300 text-lg">
            {t('chooseYourPlan')}
          </p>
        </div>

        {/* Plano VIP único */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-gradient-to-b from-orange-600/20 to-yellow-600/20 border-2 border-orange-500 rounded-2xl p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                {t('mostPopular')}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Conteúdo Exclusivo VIP
            </h3>
            <p className="text-gray-300 mb-6">
              Acesse conteúdo premium e exclusivo com nossa assinatura VIP
            </p>
            
            <div className="mb-6">
              <div className="text-orange-400 font-bold text-lg mb-2">
                🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl text-gray-400 line-through">$30</span>
                <span className="text-4xl font-bold text-orange-400">$12</span>
                <span className="text-xl text-gray-300">/mês</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Depois $30/mês. Cancele a qualquer momento.
              </p>
            </div>

            <ul className="space-y-3 mb-8 text-left">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
              Assinar Agora
            </Button>
          </div>
        </div>

        {/* Seção de Depoimentos */}
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {t('whatMembersSay')}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
