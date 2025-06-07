
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Star, CheckCircle } from 'lucide-react';

interface PlanCardProps {
  title: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  features: string[];
  onSubscribe: () => void;
  isPopular?: boolean;
  icon?: 'crown' | 'star';
  gradientFrom?: string;
  gradientTo?: string;
}

const PlanCard = ({
  title,
  description,
  originalPrice,
  currentPrice,
  features,
  onSubscribe,
  isPopular = false,
  icon = 'crown',
  gradientFrom = 'yellow-600',
  gradientTo = 'orange-600'
}: PlanCardProps) => {
  const IconComponent = icon === 'crown' ? Crown : Star;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-yellow-600/30 rounded-2xl p-6 relative">
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className={`bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-full px-4 py-1`}>
            <span className="text-white font-bold text-xs">⭐ MAIS POPULAR</span>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <IconComponent className={`h-12 w-12 text-${icon === 'crown' ? 'yellow' : 'purple'}-500 mx-auto mb-4`} />
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>

      {/* Oferta Especial */}
      <div className={`bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-full px-4 py-2 mb-6`}>
        <div className="flex items-center justify-center">
          <span className="text-white font-bold text-sm">🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!</span>
        </div>
      </div>

      {/* Preço */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4">
          <span className="text-2xl text-gray-400 line-through">${originalPrice}</span>
          <span className={`text-4xl font-bold text-${icon === 'crown' ? 'yellow' : 'purple'}-500`}>$ {currentPrice}</span>
          <span className="text-lg text-gray-300">/mês</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Depois ${originalPrice}/mês. Cancele a qualquer momento.
        </p>
      </div>

      {/* Benefícios */}
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-gray-300">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            {feature}
          </div>
        ))}
      </div>

      <Button
        onClick={onSubscribe}
        className={`w-full bg-gradient-to-r from-${gradientFrom} to-${gradientTo} hover:from-${gradientFrom.replace('600', '500')} hover:to-${gradientTo.replace('600', '500')} text-white py-3 text-lg font-bold rounded-xl`}
      >
        Assinar Agora
      </Button>
    </div>
  );
};

export default PlanCard;
