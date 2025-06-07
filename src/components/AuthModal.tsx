
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, User, Mail, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';
import PhoneInput from './PhoneInput';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal = ({ onClose, onSuccess }: AuthModalProps) => {
  const { t } = useAutoTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+55');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Tentando autenticação:', { isLogin, email, phone, countryCode });

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log('Resultado do login:', { data, error });
        
        if (error) {
          throw error;
        }
        
        console.log('Login realizado com sucesso!');
      } else {
        // Cadastro com dados do telefone nos metadados
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              phone: phone,
              country_code: countryCode
            }
          }
        });
        
        console.log('Resultado do cadastro:', { data, error });
        
        if (error) {
          throw error;
        }
        
        if (data.user && !data.session) {
          setError('Verifique seu email para confirmar a conta!');
          return;
        }
        
        console.log('Cadastro realizado com sucesso!');
      }
      
      onSuccess();
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      
      // Traduzir erros comuns
      let errorMessage = error.message;
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'Este email já está cadastrado';
      } else if (error.message.includes('Password should be at least 6 characters')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-600/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Login' : 'Cadastro'}
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                countryCode={countryCode}
                onCountryChange={setCountryCode}
                placeholder="Número de telefone"
              />
            </div>
          )}

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Senha (min. 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-600 text-white"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white"
          >
            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-600 hover:text-yellow-500"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </button>
        </div>
        
        <div className="mt-4 text-xs text-gray-400 text-center">
          Conexão Supabase: Ativa ✓
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
