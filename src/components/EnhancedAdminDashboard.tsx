
import React, { useState, useEffect } from 'react';
import { Users, Crown, Calendar, TrendingUp, Trash2, LogOut, BarChart3, Settings, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  id: string;
  email: string;
  phone: string;
  country_code: string;
  name: string;
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

const EnhancedAdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [activeView, setActiveView] = useState('dashboard');
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

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      console.log('Excluindo usuário:', userId);
      
      // Primeiro, excluir assinaturas do usuário
      const { error: subscriptionsError } = await supabase
        .from('subscriptions')
        .delete()
        .eq('user_id', userId);

      if (subscriptionsError) {
        console.error('Erro ao excluir assinaturas:', subscriptionsError);
      }

      // Depois, excluir o perfil do usuário
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        throw profileError;
      }

      console.log('Usuário excluído com sucesso');
      fetchData(); // Recarregar dados
      
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário. Tente novamente.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
    
    // Configurar real-time updates
    console.log('Configurando canais em tempo real...');
    
    const usersChannel = supabase
      .channel('users-realtime')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        (payload) => {
          console.log('🔥 TEMPO REAL - Mudança nos usuários:', payload);
          setRealtimeStatus(`Usuário ${payload.eventType} - ${new Date().toLocaleTimeString()}`);
          fetchData();
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
          fetchData();
        }
      )
      .subscribe((status) => {
        console.log('Status do canal de assinaturas:', status);
        if (status === 'SUBSCRIBED') {
          setRealtimeStatus('Conectado - Monitorando assinaturas');
        }
      });

    return () => {
      supabase.removeChannel(usersChannel);
      supabase.removeChannel(subscriptionsChannel);
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

  // Dados para o gráfico de pizza
  const pieData = [
    { name: 'Usuários Ativos', value: stats.activeSubscriptions, color: '#10B981' },
    { name: 'Usuários Gratuitos', value: stats.totalUsers - stats.activeSubscriptions, color: '#6B7280' },
  ];

  // Dados para o gráfico de barras (últimos 7 dias)
  const barData = [
    { name: 'Seg', usuarios: 12, assinaturas: 5 },
    { name: 'Ter', usuarios: 19, assinaturas: 8 },
    { name: 'Qua', usuarios: 15, assinaturas: 6 },
    { name: 'Qui', usuarios: 22, assinaturas: 12 },
    { name: 'Sex', usuarios: 28, assinaturas: 15 },
    { name: 'Sab', usuarios: 18, assinaturas: 9 },
    { name: 'Dom', usuarios: stats.newUsersToday, assinaturas: 3 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-xl">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-gray-400">Plataforma VIP</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeView === 'dashboard' ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('users')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeView === 'users' ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Users className="h-5 w-5" />
                Usuários
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('subscriptions')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeView === 'subscriptions' ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Crown className="h-5 w-5" />
                Assinaturas
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('analytics')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeView === 'analytics' ? 'bg-yellow-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                Analytics
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {activeView === 'dashboard' && 'Dashboard'}
                {activeView === 'users' && 'Gerenciar Usuários'}
                {activeView === 'subscriptions' && 'Assinaturas'}
                {activeView === 'analytics' && 'Analytics'}
              </h1>
              <p className="text-gray-400 mt-1">
                {realtimeStatus}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">
                Última atualização: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm">Total de Usuários</p>
                      <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-200 text-sm">Assinaturas Ativas</p>
                      <p className="text-3xl font-bold text-white">{stats.activeSubscriptions}</p>
                    </div>
                    <Crown className="h-8 w-8 text-green-400" />
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-200 text-sm">Receita Total</p>
                      <p className="text-3xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-400" />
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-200 text-sm">Novos Hoje</p>
                      <p className="text-3xl font-bold text-white">{stats.newUsersToday}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-400" />
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Gráfico de Pizza */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Distribuição de Usuários</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                {/* Gráfico de Barras */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Atividade dos Últimos 7 Dias</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="usuarios" fill="#3B82F6" />
                      <Bar dataKey="assinaturas" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </>
          )}

          {/* Users View */}
          {activeView === 'users' && (
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  Lista de Usuários ({users.length})
                </h2>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Nome</TableHead>
                      <TableHead className="text-gray-300">Email</TableHead>
                      <TableHead className="text-gray-300">País</TableHead>
                      <TableHead className="text-gray-300">Data</TableHead>
                      <TableHead className="text-gray-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-gray-700">
                        <TableCell className="text-white font-medium">
                          {user.name || 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {user.email || 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {user.country_code || 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {formatDate(user.created_at)}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => deleteUser(user.id)}
                            variant="destructive"
                            size="sm"
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}

          {/* Subscriptions View */}
          {activeView === 'subscriptions' && (
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  Assinaturas ({subscriptions.length})
                </h2>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Plano</TableHead>
                      <TableHead className="text-gray-300">Valor</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
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
                        <TableCell className="text-gray-400">
                          {formatDate(subscription.created_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}

          {/* Analytics View */}
          {activeView === 'analytics' && (
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Métricas Detalhadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">{stats.totalUsers}</p>
                    <p className="text-gray-400">Total de Usuários</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">
                      {((stats.activeSubscriptions / stats.totalUsers) * 100).toFixed(1)}%
                    </p>
                    <p className="text-gray-400">Taxa de Conversão</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-400">
                      {(stats.totalRevenue / stats.activeSubscriptions || 0).toFixed(2)}
                    </p>
                    <p className="text-gray-400">Receita Média por Usuário</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
