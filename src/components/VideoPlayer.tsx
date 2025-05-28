
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayer = ({ videoUrl, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Auto-play quando o componente é montado
    if (videoRef.current) {
      videoRef.current.play();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-gradient-purple-pink p-2 rounded-full hover:bg-gradient-purple-pink-dark transition-all duration-300 transform hover:scale-110"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="relative bg-gradient-purple-pink p-1 rounded-lg">
          <video
            ref={videoRef}
            controls
            className="w-full h-auto rounded-lg"
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
