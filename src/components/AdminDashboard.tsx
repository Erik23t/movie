
import React, { useState, useEffect } from 'react';
import { Users, Crown, Calendar, TrendingUp, Eye, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  id: string;
  email: string;
  phone: string;
  country_code: string;
  created_at: string;
  updated_at: string;
}

interface SubscriptionData {
  id: string;
  user_id: string;
  plan_type: string;
  status: string;
  price_paid: number;
  currency: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    newUsersToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [realtimeStatus, setRealtimeStatus] = useState('Conectando...');

  const fetchData = async () => {
    try {
      console.log('Iniciando busca de dados...');
      
      // Buscar usuários
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Erro ao buscar usuários:', usersError);
      } else {
        console.log('Usuários encontrados:', usersData?.length || 0);
        setUsers(usersData || []);
      }

      // Buscar assinaturas
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (subscriptionsError) {
        console.error('Erro ao buscar assinaturas:', subscriptionsError);
      } else {
        console.log('Assinaturas encontradas:', subscriptionsData?.length || 0);
        setSubscriptions(subscriptionsData || []);
      }

      // Calcular estatísticas
      const today = new Date().toISOString().split('T')[0];
      const newUsersToday = (usersData || []).filter(user => 
        user.created_at.split('T')[0] === today
      ).length;

      const activeSubscriptions = (subscriptionsData || []).filter(sub => 
        sub.status === 'active'
      ).length;

      const totalRevenue = (subscriptionsData || []).reduce((sum, sub) => 
        sum + (sub.price_paid || 0), 0
      );

      setStats({
        totalUsers: (usersData || []).length,
        activeSubscriptions,
        totalRevenue,
        newUsersToday
      });

      console.log('Estatísticas calculadas:', {
        totalUsers: (usersData || []).length,
        activeSubscriptions,
        totalRevenue,
        newUsersToday
      });

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Configurar real-time updates com logs detalhados
    console.log('Configurando canais em tempo real...');
    
    const usersChannel = supabase
      .channel('users-realtime')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        (payload) => {
          console.log('🔥 TEMPO REAL - Mudança nos usuários:', payload);
          setRealtimeStatus(`Usuário ${payload.eventType} - ${new Date().toLocaleTimeString()}`);
          fetchData(); // Recarregar dados quando houver mudanças
        }
      )
      .subscribe((status) => {
        console.log('Status do canal de usuários:', status);
        if (status === 'SUBSCRIBED') {
          setRealtimeStatus('Conectado - Monitorando usuários');
        }
      });

    const subscriptionsChannel = supabase
      .channel('subscriptions-realtime')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'subscriptions' }, 
        (payload) => {
          console.log('🔥 TEMPO REAL - Mudança nas assinaturas:', payload);
          setRealtimeStatus(`Assinatura ${payload.eventType} - ${new Date().toLocaleTimeString()}`);
          fetchData(); // Recarregar dados quando houver mudanças
        }
      )
      .subscribe((status) => {
        console.log('Status do canal de assinaturas:', status);
        if (status === 'SUBSCRIBED') {
          setRealtimeStatus('Conectado - Monitorando assinaturas');
        }
      });

    // Atualizar dados a cada 30 segundos como backup
    const interval = setInterval(() => {
      console.log('Atualização automática dos dados...');
      fetchData();
    }, 30000);

    return () => {
      console.log('Limpando canais e intervalos...');
      supabase.removeChannel(usersChannel);
      supabase.removeChannel(subscriptionsChannel);
      clearInterval(interval);
    };
  }, []);

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-xl">Carregando dashboard...</p>
          <p className="mt-2 text-sm text-gray-400">Conectando ao banco de dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dashboard Administrativo
            </h1>
            <p className="text-gray-400 mt-2">
              Monitoramento em tempo real da plataforma
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Conectado ao Supabase</span>
            </div>
            <div className="text-xs text-gray-400">
              Status: {realtimeStatus}
            </div>
            <div className="text-xs text-gray-500">
              Última atualização: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Usuários</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                <p className="text-xs text-green-400 mt-1">
                  +{stats.newUsersToday} hoje
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Assinaturas Ativas</p>
                <p className="text-3xl font-bold text-white">{stats.activeSubscriptions}</p>
                <p className="text-xs text-yellow-400 mt-1">
                  {subscriptions.length} total
                </p>
              </div>
              <Crown className="h-8 w-8 text-yellow-400" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Receita Total</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-green-400 mt-1">
                  {subscriptions.length} transações
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Novos Hoje</p>
                <p className="text-3xl font-bold text-white">{stats.newUsersToday}</p>
                <p className="text-xs text-purple-400 mt-1">
                  Cadastros de hoje
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Table */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Usuários Recentes ({users.length})
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Atualização em tempo real
              </p>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">País</TableHead>
                    <TableHead className="text-gray-300">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.slice(0, 10).map((user) => (
                    <TableRow key={user.id} className="border-gray-700">
                      <TableCell className="text-white font-medium">
                        {user.email || 'N/A'}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {user.country_code || 'N/A'}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {formatDate(user.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-400 py-8">
                        Nenhum usuário encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Subscriptions Table */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Assinaturas Recentes ({subscriptions.length})
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Atualização em tempo real
              </p>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Plano</TableHead>
                    <TableHead className="text-gray-300">Valor</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.slice(0, 10).map((subscription) => (
                    <TableRow key={subscription.id} className="border-gray-700">
                      <TableCell className="text-white font-medium">
                        {subscription.plan_type.toUpperCase()}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatCurrency(subscription.price_paid, subscription.currency)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.status === 'active' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {subscription.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {subscriptions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-400 py-8">
                        Nenhuma assinatura encontrada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
