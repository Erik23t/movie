
import React, { useState } from 'react';
import { User, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  onSubscriptionClick: () => void;
}

const TopBar = ({ onSubscriptionClick }: TopBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Barra Superior */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-yellow-600/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              VIP CLUB
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              onClick={onSubscriptionClick}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-full"
            >
              Assinar VIP
            </Button>
            <Button
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
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
                Assinar VIP
              </Button>
              <Button
                variant="outline"
                className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-black"
              >
                <User className="h-4 w-4 mr-2" />
                Login / Cadastro
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
