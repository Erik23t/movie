
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAutoTranslation } from '@/hooks/useAutoTranslation';

interface TranslatedAgeVerificationProps {
  onConfirm: () => void;
}

const TranslatedAgeVerification = ({ onConfirm }: TranslatedAgeVerificationProps) => {
  const { t } = useAutoTranslation();

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="bg-black border border-orange-500 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('ageVerificationTitle')}
          </h2>
          <p className="text-gray-300 text-lg">
            {t('ageVerificationText')}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {t('ageVerificationSubtext')}
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            {t('ageVerificationConfirm')}
          </Button>
          
          <Button
            onClick={handleDecline}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 py-3 text-lg rounded-xl"
          >
            {t('ageVerificationDecline')}
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          {t('ageVerificationDisclaimer')}
        </p>
      </div>
    </div>
  );
};

export default TranslatedAgeVerification;
