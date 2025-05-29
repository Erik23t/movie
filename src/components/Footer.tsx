
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-700 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-8 text-center">
        <div className="mb-6 sm:mb-8">
          <div className="inline-block bg-white p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-white">
                M
              </span>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Members Club
          </h3>
        </div>
        
        <div className="text-gray-400 space-y-2 text-sm sm:text-base">
          <p>&copy; 2024 Members Club. Todos os direitos reservados.</p>
          <p className="text-xs sm:text-sm">Conteúdo exclusivo para membros verificados</p>
        </div>
        
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base">
            Termos de Uso
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base">
            Privacidade
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base">
            Suporte
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
