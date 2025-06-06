
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FullscreenVideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

const FullscreenVideoPlayer = ({ videoUrl, onClose }: FullscreenVideoPlayerProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <Button
        onClick={onClose}
        variant="ghost"
        className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2"
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>
      
      <iframe
        src={videoUrl}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture"
        title="Video Player"
      />
    </div>
  );
};

export default FullscreenVideoPlayer;
