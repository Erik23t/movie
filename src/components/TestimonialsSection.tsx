
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Michael Johnson",
      location: "New York, USA",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Conteúdo incrível! Vale cada centavo da assinatura. Qualidade excepcional e sempre conteúdo novo."
    },
    {
      id: 2,
      name: "David Smith",
      location: "Los Angeles, USA",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "A melhor plataforma que já usei. Interface perfeita e conteúdo de alta qualidade sempre atualizado."
    },
    {
      id: 3,
      name: "Robert Williams",
      location: "Chicago, USA",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Simplesmente fantástico! Recomendo para todos que buscam conteúdo premium de verdade."
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [isMobile, testimonials.length]);

  if (isMobile) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-white">
          O Que Nossos Membros Dizem
        </h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${testimonials.length * 100}%`
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-600"
                    />
                    <div>
                      <h3 className="font-semibold text-white text-sm sm:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicadores de posição */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-white">
        O Que Nossos Membros Dizem
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-600"
              />
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {testimonial.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {testimonial.location}
                </p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              "{testimonial.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
