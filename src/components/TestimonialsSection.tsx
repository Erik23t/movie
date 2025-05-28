
import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Johnson",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Incredible content! The quality is absolutely amazing and the exclusive videos are worth every penny. Highly recommend!"
    },
    {
      id: 2,
      name: "David Rodriguez",
      location: "California, USA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Best investment I've made this year. The VIP content is outstanding and the streaming quality is perfect."
    },
    {
      id: 3,
      name: "James Wilson",
      location: "Texas, USA",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Amazing platform! The exclusive content and premium quality make it totally worth the subscription."
    },
    {
      id: 4,
      name: "Robert Brown",
      location: "Florida, USA",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Top-notch service! The content variety is incredible and the user experience is smooth on all devices."
    },
    {
      id: 5,
      name: "Christopher Davis",
      location: "Illinois, USA",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Absolutely love this platform! The premium content quality is unmatched. Worth every dollar!"
    },
    {
      id: 6,
      name: "Andrew Miller",
      location: "Nevada, USA",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Fantastic experience! The VIP content is exactly what I was looking for. Great value for money."
    }
  ];

  return (
    <div className="mt-12 sm:mt-16">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-netflix-purple to-netflix-pink bg-clip-text text-transparent">
          O Que Nossos Membros Dizem
        </h3>
        <p className="text-gray-400 text-base sm:text-lg">
          Depoimentos reais de assinantes satisfeitos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-900/50 backdrop-blur-sm border border-netflix-purple/20 rounded-xl p-4 sm:p-6 hover:border-netflix-purple/40 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-netflix-purple/30">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className="bg-gradient-purple-pink text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 sm:ml-4">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  {testimonial.name}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {testimonial.location}
                </p>
                <div className="flex items-center mt-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              "{testimonial.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
