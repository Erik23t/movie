
import React, { useState, useEffect } from 'react';
import { User, X, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';
import { supabase } from '@/integrations/supabase/client';
import AuthModal from './AuthModal';

interface TopBarProps {
  onSubscriptionClick: () => void;
}

const TopBar = ({ onSubscriptionClick }: TopBarProps) => {
  const { t } = useAutoTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-yellow-600/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {t('vipClub')}
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              onClick={onSubscriptionClick}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-full"
            >
              {t('subscribeVip')}
            </Button>
            {user ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
              >
                <User className="h-4 w-4 mr-2" />
                {t('login')}
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
              <Button
                onClick={() => {
                  onSubscriptionClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white"
              >
                {t('subscribeVip')}
              </Button>
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </Button>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  variant="outline"
                  className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
                >
                  <User className="h-4 w-4 mr-2" />
                  {t('login')} / Cadastro
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
    </>
  );
};

export default TopBar;
