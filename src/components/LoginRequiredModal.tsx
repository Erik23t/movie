
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Lock, User } from 'lucide-react';

interface LoginRequiredModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const LoginRequiredModal = ({ onClose, onLoginClick }: LoginRequiredModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-600/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Lock className="h-6 w-6 text-yellow-600 mr-2" />
            <h2 className="text-xl font-bold text-white">
              Cadastro Necessário
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

        <div className="text-center">
          <p className="text-gray-300 mb-6">
            Para assistir aos vídeos exclusivos, você precisa se cadastrar na nossa plataforma.
          </p>

          <div className="space-y-3">
            <Button
              onClick={onLoginClick}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white"
            >
              <User className="mr-2 h-5 w-5" />
              Fazer Cadastro / Login
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
