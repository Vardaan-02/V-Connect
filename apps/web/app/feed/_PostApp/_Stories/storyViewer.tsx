import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StoryProgress from './storyProgress';
import StoryControls from './storyControls';

interface StoryViewerProps {
  isOpen: boolean;
  initialUserIndex: number;
  initialStoryIndex: number;
  onClose: () => void;
  stories: {
    __typename?: "Story";
    videoURL?: string | null;
    imageURL?: string | null;
    id: string;
    createdAt: any;
    likes?: Array<{
      __typename?: "Like";
      user?: {
        __typename?: "User";
        name: string;
      } | null;
    } | null> | null;
    author: {
      __typename?: "User";
      email: string;
      id: string;
      name: string;
      profileImageURL?: string | null;
      title?: string | null;
    };
  }[];
}

const StoryViewer: React.FC<StoryViewerProps> = ({ 
  isOpen, 
  initialUserIndex, 
  initialStoryIndex,
  onClose,
  stories
}) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [animation, setAnimation] = useState<string>('animate-fade-in');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const [loadedMedia, setLoadedMedia] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (isOpen) {
      setCurrentUserIndex(initialUserIndex);
      setCurrentStoryIndex(initialStoryIndex);
      setAnimation('animate-fade-in');
    }
  }, [isOpen, initialUserIndex, initialStoryIndex]);
  const currentStory = stories[currentStoryIndex];

  useEffect(() => {
    if (!currentStory) return;
    const mediaUrl = currentStory.videoURL || currentStory.imageURL;
    const preloadMedia = (mediaUrl?: string) => {
      if (mediaUrl && !loadedMedia.has(mediaUrl)) {
        if (currentStory.videoURL) {
          const video = document.createElement('video');
          video.src = mediaUrl;
          video.onloadeddata = () => {
            setLoadedMedia(prev => new Set(prev).add(mediaUrl));
          };
        } else if (currentStory.imageURL) {
          const img = new Image();
          img.src = mediaUrl;
          img.onload = () => {
            setLoadedMedia(prev => new Set(prev).add(mediaUrl));
          };
        }
      }
    };

    preloadMedia(mediaUrl);
    const nextStoryMedia = getAdjacentStoryMedia(1);
    if (nextStoryMedia) preloadMedia(nextStoryMedia);
    const prevStoryMedia = getAdjacentStoryMedia(-1);
    if (prevStoryMedia) preloadMedia(prevStoryMedia);
  }, [currentUserIndex, currentStoryIndex]);
  const getAdjacentStoryMedia = (direction: number): string | null => {
    if (direction > 0 && currentStoryIndex + 1 < stories.length) {
      return stories[currentStoryIndex + 1].videoURL || stories[currentStoryIndex + 1].imageURL;
    } 
    else if (direction < 0 && currentStoryIndex - 1 >= 0) {
      return stories[currentStoryIndex - 1].videoURL || stories[currentStoryIndex - 1].imageURL;
    }
    return null;
  };

  const goToNextStory = () => {
    if (currentStoryIndex + 1 < stories.length) {
      setAnimation('animate-slide-out-left');
      setTimeout(() => {
        setCurrentStoryIndex(currentStoryIndex + 1);
        setAnimation('animate-slide-in-right');
      }, 300);
    } else {
      setAnimation('animate-fade-out');
      setTimeout(onClose, 300);
    }
  };
  const goToPrevStory = () => {
    if (currentStoryIndex - 1 >= 0) {
      setAnimation('animate-slide-out-right');
      setTimeout(() => {
        setCurrentStoryIndex(currentStoryIndex - 1);
        setAnimation('animate-slide-in-left');
      }, 300);
    } else {
      setAnimation('animate-bounce');
      setTimeout(() => {
        setAnimation('');
      }, 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      goToNextStory();
    }
    
    if (isRightSwipe) {
      goToPrevStory();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPrevStory();
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNextStory();
  };

  if (!isOpen || !currentStory) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      ref={containerRef}
    >
      <div 
        className="relative w-full max-w-sm h-[calc(100vh-64px)] mx-auto overflow-hidden touch-action-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <StoryProgress 
          count={stories.length}
          activeIndex={currentStoryIndex}
          duration={5000}
          onComplete={goToNextStory}
        />
        <StoryControls onClose={onClose} currentStory={currentStory}/>
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          <div 
            className="w-1/3 h-full pointer-events-auto" 
            onClick={handleLeftClick}
          />
          <div className="w-1/3 h-full" />
          <div 
            className="w-1/3 h-full pointer-events-auto" 
            onClick={handleRightClick}
          />
        </div>
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white z-20 backdrop-blur-sm"
          onClick={handleLeftClick}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white z-20 backdrop-blur-sm"
          onClick={handleRightClick}
        >
          <ChevronRight size={20} />
        </button>
        <div className={`w-full h-full transition-all duration-300 ${animation}`}>
            {loadedMedia.has(currentStory.videoURL || currentStory.imageURL) ? (
            currentStory.videoURL ? (
              <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={currentStory.videoURL}
              autoPlay
              className="w-full h-full object-contain"
              />
            ) : (
              <img
              ref={mediaRef as React.RefObject<HTMLImageElement>}
              src={currentStory.imageURL}
              alt={`Story by ${currentStory.author.name}`}
              className="w-full h-full object-contain"
              />
            )
            ) : (
            <div className="w-full h-full flex items-center justify-center bg-story-black">
              <div className="w-10 h-10 rounded-full border-t-2 border-story-blue animate-spin" />
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
