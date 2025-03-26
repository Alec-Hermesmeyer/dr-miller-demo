// Video Player Component for Dr. Miller Avatar Videos
import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  onClose: () => void;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, onClose, autoPlay = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const handleCanPlay = () => {
      setIsLoading(false);
      if (autoPlay) {
        videoElement.play().catch(err => {
          console.error("Video autoplay prevented:", err);
          setIsPlaying(false);
        });
      }
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      // Optional: auto-close after video ends
      // setTimeout(onClose, 1000);
    };
    
    const handleError = () => {
      setError("Unable to load video. Please try again.");
      setIsLoading(false);
    };
    
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('error', handleError);
    
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('error', handleError);
    };
  }, [autoPlay]);
  
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => {
        console.error("Video play failed:", err);
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="relative w-full max-w-2xl rounded-lg overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black bg-opacity-60 text-white p-1 rounded-full hover:bg-opacity-80"
        >
          <X size={20} />
        </button>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              <p>{error}</p>
              <button 
                onClick={onClose}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {/* Video player */}
        <video
          ref={videoRef}
          className="w-full rounded-lg cursor-pointer"
          src={videoSrc}
          onClick={togglePlay}
          playsInline
          controls
        />
        
        {/* Play/pause overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {!isPlaying && !isLoading && !error && (
            <div className="bg-blue-600 bg-opacity-70 rounded-full p-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;