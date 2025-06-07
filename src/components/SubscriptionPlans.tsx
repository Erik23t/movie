
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Crown, Star, CheckCircle, CreditCard, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import SubscriptionModal from './SubscriptionModal';

interface SubscriptionPlansProps {
  onClose: () => void;
}

const SubscriptionPlans = ({ onClose }: SubscriptionPlansProps) => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ type: string; price: number } | null>(null);

  const handlePlanSelect = (planType: string, price: number) => {
    setSelectedPlan({ type: planType, price });
    setShowSubscriptionModal(true);
  };

  const handleSubscriptionSuccess = () => {
    setShowSubscriptionModal(false);
    onClose();
    // Aqui você pode adicionar lógica adicional após o sucesso da assinatura
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-yellow-600/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Crown className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Planos de Assinatura
              </h2>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Plano VIP - Design igual ao modal */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-yellow-600/30 rounded-2xl p-6">
                <div className="text-center mb-6">
                  <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Conteúdo Exclusivo VIP</h3>
                  <p className="text-gray-300 text-sm">
                    Acesse conteúdo premium e exclusivo com nossa assinatura VIP
                  </p>
                </div>

                {/* Oferta Especial */}
                <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full px-4 py-2 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!</span>
                  </div>
                </div>

                {/* Preço */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-2xl text-gray-400 line-through">$30</span>
                    <span className="text-4xl font-bold text-yellow-500">$ 12</span>
                    <span className="text-lg text-gray-300">/mês</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Depois $30/mês. Cancele a qualquer momento.
                  </p>
                </div>

                {/* Benefícios */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Acesso a todos os vídeos exclusivos
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Conteúdo em alta qualidade 4K
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Suporte prioritário 24/7
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Downloads ilimitados
                  </div>
                </div>

                <Button
                  onClick={() => handlePlanSelect('VIP', 12)}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 text-lg font-bold rounded-xl"
                >
                  Assinar Agora
                </Button>
              </div>
            </div>

            {/* Plano Premium - Design similar */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-purple-600/30 rounded-2xl p-6">
                <div className="text-center mb-6">
                  <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Conteúdo Premium Elite</h3>
                  <p className="text-gray-300 text-sm">
                    O melhor conteúdo premium com acesso total e vantagens exclusivas
                  </p>
                </div>

                {/* Oferta Especial */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-4 py-2 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-white font-bold text-sm">⭐ PLANO MAIS POPULAR!</span>
                  </div>
                </div>

                {/* Preço */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-2xl text-gray-400 line-through">$50</span>
                    <span className="text-4xl font-bold text-purple-500">$ 29</span>
                    <span className="text-lg text-gray-300">/mês</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Renovação automática. Cancele a qualquer momento.
                  </p>
                </div>

                {/* Benefícios */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Todos os benefícios do VIP
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Coleção Elite exclusiva
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Conteúdo inédito semanal
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Chat direto com modelos
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Acesso antecipado a novos conteúdos
                  </div>
                </div>

                <Button
                  onClick={() => handlePlanSelect('Premium', 29)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 text-lg font-bold rounded-xl"
                >
                  Assinar Agora
                </Button>
              </div>
            </div>
          </div>

          {/* Garantia e Segurança */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center text-sm text-gray-400 mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Pagamento 100% seguro com criptografia SSL
            </div>
            <p className="text-xs text-gray-500">
              Garantia de 7 dias. Se não ficar satisfeito, devolvemos seu dinheiro.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Assinatura */}
      {showSubscriptionModal && selectedPlan && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSuccess={handleSubscriptionSuccess}
          planType={selectedPlan.type}
          planPrice={selectedPlan.price}
        />
      )}
    </>
  );
};

export default SubscriptionPlans;
