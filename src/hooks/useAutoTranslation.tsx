
import { useState, useEffect, createContext, useContext } from 'react';

interface TranslationData {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: TranslationData = {
  'pt-BR': {
    'ageVerificationTitle': 'Verificação de Idade',
    'ageVerificationText': 'Você deve ter 18 anos ou mais para acessar este conteúdo.',
    'ageVerificationSubtext': 'Este site contém material exclusivo para adultos.',
    'ageVerificationConfirm': 'Sim, sou maior de 18 anos',
    'ageVerificationDecline': 'Não, sair do site',
    'ageVerificationDisclaimer': 'Ao continuar, você confirma que tem idade legal para visualizar este conteúdo em sua jurisdição.',
    'exclusiveContent': 'ÁREA EXCLUSIVA',
    'exclusiveContentDesc': 'Conteúdo premium especialmente selecionado para você',
    'playContent': 'Reproduzir Conteúdo',
    'subscribeVip': 'Assinar VIP',
    'featuredModels': 'Modelos em Destaque',
    'sampleContent': 'Conteúdo de Amostra',
    'exclusiveContentVip': 'Conteúdo Exclusivo VIP',
    'premiumAccess': 'Acesse conteúdo premium e exclusivo com nossa assinatura VIP',
    'specialOffer': '🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!',
    'afterPrice': 'Depois $30/mês. Cancele a qualquer momento.',
    'eliteCollection': 'Coleção Elite',
    'premiumCollection': 'Coleção Premium',
    'vipClub': 'VIP CLUB',
    'login': 'Login',
    'logout': 'Sair'
  },
  'en-US': {
    'ageVerificationTitle': 'Age Verification',
    'ageVerificationText': 'You must be 18 years or older to access this content.',
    'ageVerificationSubtext': 'This site contains adult-only material.',
    'ageVerificationConfirm': 'Yes, I am 18 or older',
    'ageVerificationDecline': 'No, exit site',
    'ageVerificationDisclaimer': 'By continuing, you confirm that you are of legal age to view this content in your jurisdiction.',
    'exclusiveContent': 'EXCLUSIVE AREA',
    'exclusiveContentDesc': 'Premium content specially selected for you',
    'playContent': 'Play Content',
    'subscribeVip': 'Subscribe VIP',
    'featuredModels': 'Featured Models',
    'sampleContent': 'Sample Content',
    'exclusiveContentVip': 'VIP Exclusive Content',
    'premiumAccess': 'Access premium and exclusive content with our VIP subscription',
    'specialOffer': '🔥 SPECIAL OFFER - 60% OFF 1st month!',
    'afterPrice': 'Then $30/month. Cancel anytime.',
    'eliteCollection': 'Elite Collection',
    'premiumCollection': 'Premium Collection',
    'vipClub': 'VIP CLUB',
    'login': 'Login',
    'logout': 'Logout'
  },
  'es-ES': {
    'ageVerificationTitle': 'Verificación de Edad',
    'ageVerificationText': 'Debes tener 18 años o más para acceder a este contenido.',
    'ageVerificationSubtext': 'Este sitio contiene material exclusivo para adultos.',
    'ageVerificationConfirm': 'Sí, soy mayor de 18 años',
    'ageVerificationDecline': 'No, salir del sitio',
    'ageVerificationDisclaimer': 'Al continuar, confirmas que tienes la edad legal para ver este contenido en tu jurisdicción.',
    'exclusiveContent': 'ÁREA EXCLUSIVA',
    'exclusiveContentDesc': 'Contenido premium especialmente seleccionado para ti',
    'playContent': 'Reproducir Contenido',
    'subscribeVip': 'Suscribirse VIP',
    'featuredModels': 'Modelos Destacados',
    'sampleContent': 'Contenido de Muestra',
    'exclusiveContentVip': 'Contenido Exclusivo VIP',
    'premiumAccess': 'Accede a contenido premium y exclusivo con nuestra suscripción VIP',
    'specialOffer': '🔥 OFERTA ESPECIAL - 60% OFF primer mes!',
    'afterPrice': 'Luego $30/mes. Cancela en cualquier momento.',
    'eliteCollection': 'Colección Elite',
    'premiumCollection': 'Colección Premium',
    'vipClub': 'CLUB VIP',
    'login': 'Iniciar Sesión',
    'logout': 'Cerrar Sesión'
  }
};

interface TranslationContextType {
  language: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({ children, initialLanguage }: { children: React.ReactNode; initialLanguage?: string }) => {
  const [language, setLanguageState] = useState<string>(initialLanguage || 'pt-BR');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['pt-BR'][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useAutoTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    // Fallback for components not wrapped in provider
    return {
      language: 'pt-BR',
      t: (key: string) => translations['pt-BR'][key] || key,
      setLanguage: () => {}
    };
  }
  return context;
};
