
import React, { useState, useEffect } from 'react';
import { Star, Crown } from 'lucide-react';

interface Subscriber {
  name: string;
  country: string;
  flag: string;
  plan: string;
}

const subscribers: Subscriber[] = [
  { name: "Carlos Rodriguez", country: "España", flag: "🇪🇸", plan: "VIP" },
  { name: "Michael Johnson", country: "Estados Unidos", flag: "🇺🇸", plan: "Premium" },
  { name: "João Silva", country: "Brasil", flag: "🇧🇷", plan: "VIP" },
  { name: "David Wilson", country: "Estados Unidos", flag: "🇺🇸", plan: "Premium" },
  { name: "André Müller", country: "Alemanha", flag: "🇩🇪", plan: "VIP" },
  { name: "James Smith", country: "Estados Unidos", flag: "🇺🇸", plan: "Premium" },
  { name: "Pablo García", country: "España", flag: "🇪🇸", plan: "VIP" },
  { name: "Ricardo Santos", country: "Brasil", flag: "🇧🇷", plan: "Premium" },
  { name: "Lucas Martins", country: "Brasil", flag: "🇧🇷", plan: "VIP" },
  { name: "Thomas Anderson", country: "Estados Unidos", flag: "🇺🇸", plan: "Premium" },
  { name: "Hans Fischer", country: "Alemanha", flag: "🇩🇪", plan: "VIP" },
  { name: "Diego López", country: "España", flag: "🇪🇸", plan: "Premium" },
  { name: "Klaus Weber", country: "Alemanha", flag: "🇩🇪", plan: "VIP" },
  { name: "Roberto Fernandez", country: "España", flag: "🇪🇸", plan: "Premium" }
];

const SubscriptionNotifications = () => {
  const [currentSubscriber, setCurrentSubscriber] = useState<Subscriber | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const showNotification = () => {
      const randomSubscriber = subscribers[Math.floor(Math.random() * subscribers.length)];
      setCurrentSubscriber(randomSubscriber);
      setIsVisible(true);

      // Esconder após 5 segundos
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Mostrar primeira notificação após 3 segundos
    timeoutId = setTimeout(() => {
      showNotification();
      
      // Continuar mostrando a cada 40 segundos
      intervalId = setInterval(showNotification, 40000);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  if (!isVisible || !currentSubscriber) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-left duration-500">
      <div className="bg-gradient-to-r from-green-600 to-green-700 border border-green-500/30 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {currentSubscriber.plan === 'VIP' ? (
              <Crown className="h-6 w-6 text-yellow-400" />
            ) : (
              <Star className="h-6 w-6 text-purple-400" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg">{currentSubscriber.flag}</span>
              <p className="text-sm font-medium text-white truncate">
                {currentSubscriber.name}
              </p>
            </div>
            
            <p className="text-xs text-green-100">
              {currentSubscriber.country}
            </p>
            
            <p className="text-xs text-green-200 mt-1">
              Assinou o plano <span className="font-semibold">{currentSubscriber.plan}</span>
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionNotifications;
