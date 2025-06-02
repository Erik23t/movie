
import { useState, useEffect } from 'react';

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
    'exclusiveContent': 'Área Exclusiva para Membros',
    'subscriptionPlans': 'Escolha Seu Plano',
    'subscriptionSubtext': 'Acesse conteúdo exclusivo e premium',
    'basicPlan': 'Básico',
    'premiumPlan': 'Premium',
    'vipPlan': 'VIP Exclusivo',
    'subscribeButton': 'Assinar',
    'specialOffer': '🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!',
    'afterPrice': 'Depois $30/mês. Cancele a qualquer momento.',
    'exclusiveContentVip': 'Conteúdo Exclusivo VIP',
    'premiumAccess': 'Acesse conteúdo premium e exclusivo com nossa assinatura VIP'
  },
  'en-US': {
    'ageVerificationTitle': 'Age Verification',
    'ageVerificationText': 'You must be 18 years or older to access this content.',
    'ageVerificationSubtext': 'This site contains adult-only material.',
    'ageVerificationConfirm': 'Yes, I am 18 or older',
    'ageVerificationDecline': 'No, exit site',
    'ageVerificationDisclaimer': 'By continuing, you confirm that you are of legal age to view this content in your jurisdiction.',
    'exclusiveContent': 'Exclusive Members Area',
    'subscriptionPlans': 'Choose Your Plan',
    'subscriptionSubtext': 'Access exclusive and premium content',
    'basicPlan': 'Basic',
    'premiumPlan': 'Premium',
    'vipPlan': 'VIP Exclusive',
    'subscribeButton': 'Subscribe',
    'specialOffer': '🔥 SPECIAL OFFER - 60% OFF 1st month!',
    'afterPrice': 'Then $30/month. Cancel anytime.',
    'exclusiveContentVip': 'VIP Exclusive Content',
    'premiumAccess': 'Access premium and exclusive content with our VIP subscription'
  },
  'es-ES': {
    'ageVerificationTitle': 'Verificación de Edad',
    'ageVerificationText': 'Debes tener 18 años o más para acceder a este contenido.',
    'ageVerificationSubtext': 'Este sitio contiene material exclusivo para adultos.',
    'ageVerificationConfirm': 'Sí, soy mayor de 18 años',
    'ageVerificationDecline': 'No, salir del sitio',
    'ageVerificationDisclaimer': 'Al continuar, confirmas que tienes la edad legal para ver este contenido en tu jurisdicción.',
    'exclusiveContent': 'Área Exclusiva para Miembros',
    'subscriptionPlans': 'Elige Tu Plan',
    'subscriptionSubtext': 'Accede a contenido exclusivo y premium',
    'basicPlan': 'Básico',
    'premiumPlan': 'Premium',
    'vipPlan': 'VIP Exclusivo',
    'subscribeButton': 'Suscribirse',
    'specialOffer': '🔥 OFERTA ESPECIAL - 60% OFF primer mes!',
    'afterPrice': 'Luego $30/mes. Cancela en cualquier momento.',
    'exclusiveContentVip': 'Contenido Exclusivo VIP',
    'premiumAccess': 'Accede a contenido premium y exclusivo con nuestra suscripción VIP'
  },
  'fr-FR': {
    'ageVerificationTitle': 'Vérification d\'âge',
    'ageVerificationText': 'Vous devez avoir 18 ans ou plus pour accéder à ce contenu.',
    'ageVerificationSubtext': 'Ce site contient du matériel réservé aux adultes.',
    'ageVerificationConfirm': 'Oui, j\'ai 18 ans ou plus',
    'ageVerificationDecline': 'Non, quitter le site',
    'ageVerificationDisclaimer': 'En continuant, vous confirmez que vous avez l\'âge légal pour voir ce contenu dans votre juridiction.',
    'exclusiveContent': 'Zone Exclusive aux Membres',
    'subscriptionPlans': 'Choisissez Votre Plan',
    'subscriptionSubtext': 'Accédez au contenu exclusif et premium',
    'basicPlan': 'Basique',
    'premiumPlan': 'Premium',
    'vipPlan': 'VIP Exclusif',
    'subscribeButton': 'S\'abonner',
    'specialOffer': '🔥 OFFRE SPÉCIALE - 60% OFF 1er mois!',
    'afterPrice': 'Puis $30/mois. Annulez à tout moment.',
    'exclusiveContentVip': 'Contenu Exclusif VIP',
    'premiumAccess': 'Accédez au contenu premium et exclusif avec notre abonnement VIP'
  }
};

export const useAutoTranslation = () => {
  const [language, setLanguage] = useState<string>('en-US');
  const [isLoading, setIsLoading] = useState(true);

  const detectUserLocation = async () => {
    try {
      // Primeiro, tenta detectar pelo navegador
      const browserLang = navigator.language || navigator.languages[0];
      
      // Mapeia códigos de país para idiomas
      const countryToLanguage: { [key: string]: string } = {
        'BR': 'pt-BR',
        'US': 'en-US',
        'CA': 'en-US',
        'GB': 'en-US',
        'AU': 'en-US',
        'ES': 'es-ES',
        'MX': 'es-ES',
        'AR': 'es-ES',
        'FR': 'fr-FR',
        'BE': 'fr-FR',
        'CH': 'fr-FR'
      };

      // Tenta detectar pelo IP usando um serviço gratuito
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryToLanguage[countryCode]) {
          setLanguage(countryToLanguage[countryCode]);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('Falha na detecção por IP, usando idioma do navegador');
      }

      // Fallback para o idioma do navegador
      if (browserLang.startsWith('pt')) {
        setLanguage('pt-BR');
      } else if (browserLang.startsWith('es')) {
        setLanguage('es-ES');
      } else if (browserLang.startsWith('fr')) {
        setLanguage('fr-FR');
      } else {
        setLanguage('en-US');
      }
      
    } catch (error) {
      console.error('Erro na detecção de idioma:', error);
      setLanguage('en-US');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    detectUserLocation();
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en-US'][key] || key;
  };

  return { language, t, isLoading };
};
