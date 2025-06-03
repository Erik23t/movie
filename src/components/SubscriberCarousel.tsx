import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Play, Crown } from 'lucide-react';

interface SubscriberCarouselProps {
  onSubscriptionClick: () => void;
  collectionType?: 'exclusive' | 'premium' | 'elite';
}

const SubscriberCarousel = ({ onSubscriptionClick, collectionType = 'exclusive' }: SubscriberCarouselProps) => {
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

  const getItemCount = () => {
    return collectionType === 'exclusive' ? 30 : 10;
  };

  const generatePlaceholderItems = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Conteúdo ${i + 1}`,
      duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      thumbnail: `https://picsum.photos/400/600?random=${i + 50}`,
      isLocked: true,
    }));
  };

  const items = generatePlaceholderItems(getItemCount());

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
                <div className="relative overflow-hidden rounded-xl bg-gray-800 aspect-[3/4]">
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
                      onClick={onSubscriptionClick}
                      className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Assinar para Ver
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
