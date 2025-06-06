
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Play, Crown } from 'lucide-react';

interface SubscriberCarouselProps {
  onSubscriptionClick: () => void;
  onVideoClick: (videoUrl: string) => void;
  collectionType?: 'exclusive' | 'premium' | 'elite';
}

const SubscriberCarousel = ({ onSubscriptionClick, onVideoClick, collectionType = 'exclusive' }: SubscriberCarouselProps) => {
  const getCrownColor = () => {
    switch (collectionType) {
      case 'elite':
        return 'text-orange-500';
      case 'premium':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  const getVideoData = () => {
    if (collectionType === 'exclusive') {
      return [
        {
          id: 1,
          title: 'Conteúdo VIP 1',
          duration: '12:45',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/Yr3jMnKhpY?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 2,
          title: 'Conteúdo VIP 2',
          duration: '15:20',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/0xYRP7KPWE?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 3,
          title: 'Conteúdo VIP 3',
          duration: '18:30',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/NIBEKMQcTj?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 4,
          title: 'Conteúdo VIP 4',
          duration: '22:15',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/E5Mr2OnBIn?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 5,
          title: 'Conteúdo VIP 5',
          duration: '14:55',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/BeHlIKaK83?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 6,
          title: 'Conteúdo VIP 6',
          duration: '19:40',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/ahYe0Ugcjz?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 7,
          title: 'Conteúdo VIP 7',
          duration: '16:25',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/anjoc4e3cd?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 8,
          title: 'Conteúdo VIP 8',
          duration: '21:10',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/QJVB7YhrOs?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 9,
          title: 'Conteúdo VIP 9',
          duration: '17:35',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/FTLiEt41oO?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        },
        {
          id: 10,
          title: 'Conteúdo VIP 10',
          duration: '20:50',
          thumbnail: 'https://i.postimg.cc/HLPcbXbp/Design-sem-nome-2.jpg',
          videoUrl: 'https://app.vidzflow.com/v/bapO0jZeD0?dq=576&ap=false&muted=false&loop=false&ctp=true&bv=false&piv=false&playsinline=false&bc=%234E5FFD&controls=play-large%2Cplay%2Cprogress%2Ccurrent-time%2Cmute%2Cvolume%2Csettings%2Cfullscreen',
          isLocked: false,
        }
      ];
    } else if (collectionType === 'elite') {
      // Para elite, usar a nova imagem e gerar 10 conteúdos
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Elite Conteúdo ${i + 1}`,
        duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        thumbnail: 'https://i.postimg.cc/rmFjw1MM/Design-sem-nome-2.jpg',
        isLocked: true,
      }));
    } else {
      // Para premium, gerar conteúdo placeholder
      const count = 10;
      return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `Conteúdo ${i + 1}`,
        duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        thumbnail: `https://picsum.photos/400/600?random=${i + 50}`,
        isLocked: true,
      }));
    }
  };

  const items = getVideoData();

  const handleVideoClick = (item: any) => {
    if (item.videoUrl) {
      onVideoClick(item.videoUrl);
    } else {
      onSubscriptionClick();
    }
  };

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <div className="group relative">
                <div className="relative overflow-hidden rounded-xl bg-gray-800 aspect-[3/4] cursor-pointer" onClick={() => handleVideoClick(item)}>
                  {/* Crown Icon */}
                  <div className="absolute top-2 right-2 z-20">
                    <Crown className={`h-6 w-6 ${getCrownColor()}`} />
                  </div>
                  
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {item.videoUrl ? 'Assistir' : 'Assinar para Ver'}
                    </Button>
                  </div>
                  
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className="text-white text-sm font-medium truncate">{item.title}</h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-12 bg-black/50 border-white/20 text-white hover:bg-black/70" />
        <CarouselNext className="hidden sm:flex -right-12 bg-black/50 border-white/20 text-white hover:bg-black/70" />
      </Carousel>
    </div>
  );
};

export default SubscriberCarousel;
