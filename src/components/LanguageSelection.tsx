
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const LanguageSelection = ({ onLanguageSelect }: LanguageSelectionProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="bg-black border border-orange-500 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Choose Your Country Language
          </h2>
          <p className="text-gray-300 text-lg">
            Select your preferred language to continue
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => onLanguageSelect('en-US')}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            English (US)
          </Button>
          
          <Button
            onClick={() => onLanguageSelect('es-ES')}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            Español (ES)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
