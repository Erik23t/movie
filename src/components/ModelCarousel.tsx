import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, X, Heart } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface ModelCarouselProps {
  onVideoClick: () => void;
  onSubscriptionClick: () => void;
}

const ModelCarousel = ({ onVideoClick, onSubscriptionClick }: ModelCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchedImages, setTouchedImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  // Comentários específicos para cada modelo
  const modelComments = {
    1: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/nhHLZGzc/avatar1.jpg",
        name: "Sarah M.",
        time: "2 horas atrás",
        comment: "Conteúdo incrível! Vale muito a pena a assinatura ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/7ZKvpJXQ/avatar2.jpg",
        name: "Mike R.",
        time: "4 horas atrás",
        comment: "Qualidade excepcional, super recomendo! ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/T3qBhNxY/avatar3.jpg",
        name: "Jessica L.",
        time: "6 horas atrás",
        comment: "Melhor plataforma que já usei, conteúdo top! ❤️"
      }
    ],
    2: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/KzBwL8XG/avatar4.jpg",
        name: "Carlos T.",
        time: "1 hora atrás",
        comment: "Impressionante! Superou minhas expectativas ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/WzVpRqXM/avatar5.jpg",
        name: "Ana B.",
        time: "3 horas atrás",
        comment: "Conteúdo premium de verdade, adorei! ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/K8nXqYhp/avatar6.jpg",
        name: "David K.",
        time: "5 horas atrás",
        comment: "Interface incrível e conteúdo de qualidade ❤️"
      }
    ],
    3: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/85mLzJbC/avatar7.jpg",
        name: "Maria F.",
        time: "30 min atrás",
        comment: "Fantástico! Realmente vale cada centavo ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/yYBxMzKr/avatar8.jpg",
        name: "Robert W.",
        time: "2 horas atrás",
        comment: "Experiência única, super recomendo! ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/D0XzYhqP/avatar9.jpg",
        name: "Lisa M.",
        time: "4 horas atrás",
        comment: "Melhor investimento que fiz este ano! ❤️"
      }
    ],
    4: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/PxWzBqRY/avatar10.jpg",
        name: "John D.",
        time: "45 min atrás",
        comment: "Qualidade incrível, estou impressionado! ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/L8qRhJzY/avatar11.jpg",
        name: "Emma S.",
        time: "1 hora atrás",
        comment: "Conteúdo exclusivo de alta qualidade ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/XqBzLmNp/avatar12.jpg",
        name: "Alex P.",
        time: "3 horas atrás",
        comment: "Superou todas as expectativas! ❤️"
      }
    ],
    5: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/fW8yNxQh/avatar13.jpg",
        name: "Sophie G.",
        time: "20 min atrás",
        comment: "Absolutamente incrível! Recomendo 100% ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/C5zRhVpY/avatar14.jpg",
        name: "Marcus J.",
        time: "1 hora atrás",
        comment: "Melhor plataforma premium do mercado ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/kGBwYzXq/avatar15.jpg",
        name: "Rachel C.",
        time: "2 horas atrás",
        comment: "Conteúdo de primeira qualidade! ❤️"
      }
    ],
    6: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/05LbzKGy/avatar16.jpg",
        name: "Tyler B.",
        time: "15 min atrás",
        comment: "Excepcional! Vale muito a pena assinar ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/ZYBxdKpQ/avatar17.jpg",
        name: "Olivia H.",
        time: "50 min atrás",
        comment: "Qualidade premium em cada detalhe ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/tCYqRzXG/avatar18.jpg",
        name: "Kevin L.",
        time: "2 horas atrás",
        comment: "Experiência única e premium! ❤️"
      }
    ],
    7: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/YSLbBzpY/avatar19.jpg",
        name: "Isabella N.",
        time: "25 min atrás",
        comment: "Simplesmente perfeito! Adorei tudo ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/x1YqBzpQ/avatar20.jpg",
        name: "James V.",
        time: "1 hora atrás",
        comment: "Conteúdo de altíssima qualidade ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/wxBzMqRY/avatar21.jpg",
        name: "Mia O.",
        time: "3 horas atrás",
        comment: "Melhor investimento que já fiz! ❤️"
      }
    ],
    8: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/65YqLzXG/avatar22.jpg",
        name: "Nathan R.",
        time: "40 min atrás",
        comment: "Incrível! Superou todas as expectativas ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/TwBzKqpY/avatar23.jpg",
        name: "Zoe T.",
        time: "1 hora atrás",
        comment: "Conteúdo premium de verdade! ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/B6YqLzXG/avatar24.jpg",
        name: "Ethan M.",
        time: "2 horas atrás",
        comment: "Qualidade excepcional, recomendo! ❤️"
      }
    ],
    9: [
      {
        id: 1,
        avatar: "https://i.postimg.cc/x1BzMqRY/avatar25.jpg",
        name: "Chloe A.",
        time: "10 min atrás",
        comment: "Fantástico! Vale cada penny gasto ❤️"
      },
      {
        id: 2,
        avatar: "https://i.postimg.cc/65YqRzXG/avatar26.jpg",
        name: "Ryan F.",
        time: "35 min atrás",
        comment: "Melhor plataforma que já experimentei ❤️"
      },
      {
        id: 3,
        avatar: "https://i.postimg.cc/TwBzKqRY/avatar27.jpg",
        name: "Grace W.",
        time: "1 hora atrás",
        comment: "Conteúdo incrível e de alta qualidade! ❤️"
      }
    ]
  };

  // Imagens atualizadas com os novos links
  const models = [
    {
      id: 1,
      type: 'image' as const,
      image: "https://i.postimg.cc/xC9YRZDf/3cfc6e67-f95f-42c4-9cdc-89aeb2820a10.jpg",
      name: "Modelo 1"
    },
    {
      id: 2,
      type: 'image' as const,
      image: "https://i.postimg.cc/hjMn30c9/2661ed2c-7a46-4c61-bf61-3af5ec1b5199.jpg",
      name: "Modelo 2"
    },
    {
      id: 3,
      type: 'image' as const,
      image: "https://i.postimg.cc/yYf5xXmb/856c8a2c-53c9-4abc-9a5c-f121a6b73552-1.jpg",
      name: "Modelo 3"
    },
    {
      id: 4,
      type: 'image' as const,
      image: "https://i.postimg.cc/8z2Zfyjt/bab136ac-395d-455f-8748-715403cabae6.jpg",
      name: "Modelo 4"
    },
    {
      id: 5,
      type: 'image' as const,
      image: "https://i.postimg.cc/0NSHVTLT/39c9af01-465c-460d-8b98-abf8cda14bc1.jpg",
      name: "Modelo 5"
    },
    {
      id: 6,
      type: 'image' as const,
      image: "https://i.postimg.cc/7LrNZfWR/3dada236-0854-46c0-a3e8-b30dcf9445ac.jpg",
      name: "Modelo 6"
    },
    {
      id: 7,
      type: 'image' as const,
      image: "https://i.postimg.cc/7LrNZfWR/3dada236-0854-46c0-a3e8-b30dcf9445ac.jpg",
      name: "Modelo 7"
    },
    {
      id: 8,
      type: 'image' as const,
      image: "https://i.postimg.cc/ZRFsSrYj/c45ac9fd-11cf-4ce3-aae9-ec6ba532a40a.jpg",
      name: "Modelo 8"
    },
    {
      id: 9,
      type: 'image' as const,
      image: "https://i.postimg.cc/0NSHVTLT/39c9af01-465c-460d-8b98-abf8cda14bc1.jpg",
      name: "Modelo 9"
    }
  ];

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile: 2 items
      return 10; // Desktop: 10 items
    }
    return 10;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, models.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleImageTouch = (modelId: number) => {
    if (isMobile) {
      setTouchedImages(prev => new Set([...prev, modelId]));
    }
  };

  const handleImageClick = (modelId: number, imageUrl: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isMobile) {
      setSelectedImage(imageUrl);
      setSelectedModelId(modelId);
    } else {
      onVideoClick();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true
  });

  const translatePercentage = (100 / itemsPerView) * currentIndex;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevSlide}
          className="bg-white text-black p-2 sm:p-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white text-black p-2 sm:p-3 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
      
      <div className="overflow-hidden" {...swipeHandlers}>
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-1"
          style={{ transform: `translateX(-${translatePercentage}%)` }}
        >
          {models.map((model) => (
            <div
              key={model.id}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden">
                  <div
                    onTouchStart={() => handleImageTouch(model.id)}
                    onClick={(e) => handleImageClick(model.id, model.image, e)}
                  >
                    <img
                      src={model.image}
                      alt={model.name}
                      className={`w-full object-cover transition-all duration-300 ${
                        isMobile && !touchedImages.has(model.id) 
                          ? 'filter grayscale' 
                          : !isMobile 
                            ? 'filter grayscale hover:filter-none' 
                            : ''
                      }`}
                      style={{ width: '152px', height: '250px' }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full">
                        <Play className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-xs sm:text-sm font-semibold text-white">
                    {model.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de visualização completa de imagem com comentários */}
      {selectedImage && selectedModelId && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-start p-4 overflow-y-auto">
          <div className="relative w-full h-full flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedImage(null);
                setSelectedModelId(null);
              }}
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-all duration-300 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Imagem */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <img
                src={selectedImage}
                alt="Visualização completa"
                className="max-w-full max-h-[60vh] object-contain"
              />
            </div>

            {/* Comentários dos assinantes */}
            <div className="w-full max-w-md bg-black/80 backdrop-blur-sm rounded-lg p-4 space-y-4 mb-6">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">
                Comentários dos Assinantes
              </h3>
              
              {modelComments[selectedModelId as keyof typeof modelComments]?.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3 bg-gray-900/50 rounded-lg p-3">
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white text-sm font-semibold">{comment.name}</span>
                      <span className="text-gray-400 text-xs">{comment.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de Assinatura */}
            <div className="w-full max-w-md bg-black/80 backdrop-blur-sm rounded-lg p-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-full mb-3">
                  <span className="text-sm font-bold">🔥 OFERTA ESPECIAL - 60% OFF no 1º mês!</span>
                </div>
                
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-xl text-gray-400 line-through">$30</span>
                  <span className="text-2xl font-bold text-white">$12</span>
                  <span className="text-lg text-gray-300">/mês</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Depois $30/mês. Cancele a qualquer momento.
                </p>
                
                <button
                  onClick={onSubscriptionClick}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 px-6 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Assinar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelCarousel;
