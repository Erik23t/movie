
import React from 'react';
import { X, Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubscriptionPlansProps {
  onClose: () => void;
}

const SubscriptionPlans = ({ onClose }: SubscriptionPlansProps) => {
  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 'R$ 19,90',
      period: '/mês',
      icon: <Star className="h-8 w-8" />,
      color: 'from-yellow-600 to-orange-600',
      features: [
        'Acesso a conteúdo básico',
        'Qualidade HD',
        '1 dispositivo simultâneo',
        'Suporte por email'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 39,90',
      period: '/mês',
      icon: <Crown className="h-8 w-8" />,
      color: 'from-yellow-600 to-orange-600',
      features: [
        'Acesso a todo conteúdo',
        'Qualidade 4K Ultra HD',
        '3 dispositivos simultâneos',
        'Conteúdo exclusivo VIP',
        'Suporte prioritário',
        'Download offline'
      ],
      popular: true
    },
    {
      id: 'vip',
      name: 'VIP Exclusivo',
      price: 'R$ 79,90',
      period: '/mês',
      icon: <Zap className="h-8 w-8" />,
      color: 'from-yellow-600 to-orange-600',
      features: [
        'Acesso completo ilimitado',
        'Qualidade 8K',
        '5 dispositivos simultâneos',
        'Conteúdo exclusivo premium',
        'Lives exclusivas',
        'Suporte VIP 24/7',
        'Acesso antecipado'
      ]
    }
  ];

  const handleSubscribe = (planId: string) => {
    console.log(`Selecionado plano: ${planId}`);
    alert(`Redirecionando para pagamento do plano ${planId}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-start justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-7xl my-8">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute -top-4 right-0 sm:-top-8 sm:right-4 bg-gradient-to-r from-yellow-600 to-orange-600 p-2 sm:p-3 rounded-full hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>

        {/* Conteúdo dos planos */}
        <div className="bg-black/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-yellow-600/30">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Escolha Seu Plano
            </h2>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl">
              Acesse conteúdo exclusivo e premium
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-b p-1 rounded-2xl transform transition-all duration-300 hover:scale-105 ${
                  plan.id === 'vip' 
                    ? 'border border-orange-500' 
                    : 'border border-gray-600'
                } ${
                  plan.popular ? 'scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 rounded-full text-white text-sm font-bold">
                    MAIS POPULAR
                  </div>
                )}
                
                <div className="bg-black rounded-2xl p-4 sm:p-6 lg:p-8 h-full">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.color} mb-4`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:from-yellow-500 hover:to-orange-500 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    Assinar {plan.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-12 text-center">
            <p className="text-gray-400 text-sm sm:text-base mb-4">
              ✓ Cancele a qualquer momento • ✓ Sem compromisso • ✓ Acesso imediato
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span>Pagamento 100% seguro</span>
              <span>•</span>
              <span>Garantia de 7 dias</span>
              <span>•</span>
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
