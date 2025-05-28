
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-netflix-purple/20 py-12">
      <div className="container mx-auto px-8 text-center">
        <div className="mb-8">
          <div className="inline-block bg-gradient-purple-pink p-4 rounded-full mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-purple-pink bg-clip-text text-transparent">
                M
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-netflix-purple to-netflix-pink bg-clip-text text-transparent">
            Members Club
          </h3>
        </div>
        
        <div className="text-gray-400 space-y-2">
          <p>&copy; 2024 Members Club. Todos os direitos reservados.</p>
          <p className="text-sm">Conteúdo exclusivo para membros verificados</p>
        </div>
        
        <div className="mt-6 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-netflix-pink transition-colors duration-300">
            Termos de Uso
          </a>
          <a href="#" className="text-gray-400 hover:text-netflix-pink transition-colors duration-300">
            Privacidade
          </a>
          <a href="#" className="text-gray-400 hover:text-netflix-pink transition-colors duration-300">
            Suporte
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
