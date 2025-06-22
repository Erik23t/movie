
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Tentando login administrativo:', { username });

      // Verificar credenciais do administrador
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (adminError || !adminData) {
        throw new Error('Usuário ou senha incorretos');
      }

      // Verificação simples da senha (em produção, use hash apropriado)
      if (password === 'sabedoria20anos') {
        console.log('Login administrativo bem-sucedido!');
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(adminData));
        onLoginSuccess();
      } else {
        throw new Error('Usuário ou senha incorretos');
      }

    } catch (error: any) {
      console.error('Erro no login administrativo:', error);
      setError(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Área Administrativa
          </h1>
          <p className="text-gray-400">
            Acesso restrito para administradores
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-600 text-white"
                required
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
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-3"
          >
            {loading ? 'Verificando...' : 'Acessar Dashboard'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Sistema de Gestão - Plataforma VIP
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
