
import React, { useState, useEffect } from 'react';
import { User, X, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';
import { supabase } from '@/integrations/supabase/client';
import AuthModal from './AuthModal';
import SubscriptionModal from './SubscriptionModal';

interface TopBarProps {
  onSubscriptionClick: () => void;
}

const TopBar = ({ onSubscriptionClick }: TopBarProps) => {
  const { t } = useAutoTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    console.log('TopBar: Configurando auth listener...');
    
    // Configurar listener de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('TopBar Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Buscar perfil do usuário quando logado
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('TopBar: Erro ao obter sessão:', error);
      } else {
        console.log('TopBar: Sessão atual:', session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          fetchUserProfile(session.user.id);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Erro ao buscar perfil:', error);
      } else {
        console.log('Perfil do usuário:', data);
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Erro inesperado ao buscar perfil:', err);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Fazendo logout...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Erro no logout:', error);
      } else {
        console.log('Logout realizado com sucesso!');
      }
    } catch (err) {
      console.error('Erro inesperado no logout:', err);
    }
    setIsMobileMenuOpen(false);
  };

  const handleAuthSuccess = () => {
    console.log('Auth success - fechando modal');
    setShowAuthModal(false);
    setIsMobileMenuOpen(false);
  };

  const handleSubscriptionClick = () => {
    if (user) {
      setShowSubscriptionModal(true);
    } else {
      setShowAuthModal(true);
    }
    onSubscriptionClick();
  };

  const handleSubscriptionSuccess = () => {
    setShowSubscriptionModal(false);
    console.log('Assinatura realizada com sucesso!');
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-yellow-600/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              VIP Club
            </h1>
            {user && (
              <div className="ml-3 text-sm text-gray-400">
                <div>{user.email}</div>
                {userProfile?.phone && (
                  <div className="text-xs">{userProfile.country_code} {userProfile.phone}</div>
                )}
              </div>
            )}
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              onClick={handleSubscriptionClick}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-full"
            >
              Assinar VIP
            </Button>
            {user ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(true)}
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-black to-gray-900 border-r border-yellow-600/30">
            <div className="flex items-center justify-between p-4 border-b border-yellow-600/30">
              <h2 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Menu
              </h2>
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                size="icon"
                className="text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              {user && (
                <div className="text-sm text-gray-400 mb-4">
                  <div>Logado como: {user.email}</div>
                  {userProfile?.phone && (
                    <div className="text-xs mt-1">{userProfile.country_code} {userProfile.phone}</div>
                  )}
                </div>
              )}
              
              <Button
                onClick={() => {
                  handleSubscriptionClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white"
              >
                Assinar VIP
              </Button>
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  variant="outline"
                  className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login / Cadastro
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSuccess={handleSubscriptionSuccess}
          planType="VIP"
          planPrice={29.99}
        />
      )}
    </>
  );
};

export default TopBar;
