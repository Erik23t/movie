
import React, { useState, useEffect } from 'react';
import { Star, Crown } from 'lucide-react';

interface Subscriber {
  name: string;
  country: string;
  flag: string;
  plan: string;
  avatar: string;
}

const subscribers: Subscriber[] = [
  { 
    name: "Carlos Rodriguez", 
    country: "España", 
    flag: "🇪🇸", 
    plan: "VIP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Michael Johnson", 
    country: "Estados Unidos", 
    flag: "🇺🇸", 
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "João Silva", 
    country: "Brasil", 
    flag: "🇧🇷", 
    plan: "VIP",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "David Wilson", 
    country: "Estados Unidos", 
    flag: "🇺🇸", 
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "André Müller", 
    country: "Alemanha", 
    flag: "🇩🇪", 
    plan: "VIP",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "James Smith", 
    country: "Estados Unidos", 
    flag: "🇺🇸", 
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Pablo García", 
    country: "España", 
    flag: "🇪🇸", 
    plan: "VIP",
    avatar: "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Ricardo Santos", 
    country: "Brasil", 
    flag: "🇧🇷", 
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Lucas Martins", 
    country: "Brasil", 
    flag: "🇧🇷", 
    plan: "VIP",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Thomas Anderson", 
    country: "Estados Unidos", 
    flag: "🇺🇸", 
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Hans Fischer", 
    country: "Alemanha", 
    flag: "🇩🇪", 
    plan: "VIP",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Diego López", 
    country: "España", 
    flag: "🇪🇸", 
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1584999734482-0361aecad844?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Klaus Weber", 
    country: "Alemanha", 
    flag: "🇩🇪", 
    plan: "VIP",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=80&h=80&fit=crop&crop=face"
  },
  { 
    name: "Roberto Fernandez", 
    country: "França", 
    flag: "🇫🇷", 
    plan: "Premium",
    avatar: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&h=80&fit=crop&crop=face"
  }
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
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-green-500/30 rounded-2xl p-4 shadow-2xl max-w-sm backdrop-blur-lg">
        <div className="flex items-center space-x-4">
          {/* Avatar com ícone do plano */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/50">
              <img
                src={currentSubscriber.avatar}
                alt={currentSubscriber.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              {currentSubscriber.plan === 'VIP' ? (
                <Crown className="h-3 w-3 text-white" />
              ) : (
                <Star className="h-3 w-3 text-white" />
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg">{currentSubscriber.flag}</span>
              <p className="text-sm font-semibold text-white truncate">
                {currentSubscriber.name}
              </p>
            </div>
            
            <p className="text-xs text-gray-300 mb-1">
              {currentSubscriber.country}
            </p>
            
            <p className="text-xs text-green-300">
              Assinou o plano <span className="font-semibold text-yellow-400">{currentSubscriber.plan}</span>
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionNotifications;
