
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, CreditCard, Shield, Star, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PhoneInput from './PhoneInput';

interface SubscriptionModalProps {
  onClose: () => void;
  onSuccess: () => void;
  planType?: string;
  planPrice?: number;
}

const SubscriptionModal = ({ onClose, onSuccess, planType = 'VIP', planPrice = 29.99 }: SubscriptionModalProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+55');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Verificar se o usuário está logado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('Você precisa estar logado para assinar um plano');
        return;
      }

      // Salvar dados da assinatura no banco
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: session.user.id,
            plan_type: planType.toLowerCase(),
            price_paid: planPrice,
            currency: 'USD',
            status: 'active',
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
          }
        ]);

      if (error) {
        throw error;
      }

      console.log('Assinatura criada com sucesso:', data);
      onSuccess();
    } catch (error: any) {
      console.error('Erro na assinatura:', error);
      setError(error.message || 'Erro ao processar assinatura');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-yellow-600/30 rounded-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Assinatura {planType}
            </h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Plano {planType}</h3>
              <p className="text-gray-300 text-sm">Acesso completo por 30 dias</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-500">${planPrice}</div>
              <div className="text-sm text-gray-400">por mês</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Acesso a todos os vídeos exclusivos
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Conteúdo em alta qualidade 4K
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Suporte prioritário 24/7
            </div>
          </div>
        </div>

        <form onSubmit={handleSubscription} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                countryCode={countryCode}
                onCountryChange={setCountryCode}
                placeholder="Telefone"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <CreditCard className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-white font-medium">Dados do Cartão</span>
            </div>
            
            <Input
              type="text"
              placeholder="Nome no cartão"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
              required
            />
            
            <Input
              type="text"
              placeholder="Número do cartão"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="bg-gray-900 border-gray-600 text-white"
              maxLength={19}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="MM/AA"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                maxLength={5}
                required
              />
              <Input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                maxLength={4}
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center text-xs text-gray-400 mb-4">
            <Shield className="h-4 w-4 mr-1" />
            Seus dados estão protegidos com criptografia SSL
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 text-lg font-bold"
          >
            {loading ? 'Processando...' : `Assinar por $${planPrice}/mês`}
          </Button>
        </form>

        <div className="mt-4 text-xs text-gray-400 text-center">
          Renovação automática. Cancele a qualquer momento.
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
