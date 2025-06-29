import React from 'react';
import { X, Heart, Send, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';
import { convertIsoToHuman } from '@ui/lib/utils';

interface StoryControlsProps {
  onClose: () => void;
  currentStory: any;
}

const StoryControls: React.FC<StoryControlsProps> = ({ onClose ,currentStory}) => {
  const {date,time}=convertIsoToHuman(currentStory.createdAt);
  return (
    <>
      <div className="absolute top-14 left-0 right-0 px-4 z-20 flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="story-avatar-ring">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-story-glass">
              <img 
                src={currentStory.author.profileImageURL}
                alt={currentStory.author.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-white">
            <p className="font-medium text-sm leading-tight">{currentStory.author.name}</p>
            <p className="text-xs text-white/70">{`${date} At:${time}`}</p>
          </div>
        </div>
        <div className="flex gap-5">
          <button 
            className="text-white/90 hover:text-white transition-colors"
            onClick={() => console.log('More options')}
          >
            <MoreHorizontal size={20} />
          </button>
          <button 
            className="text-white/90 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-6 z-20 flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-6">
          <button 
            className="text-white hover:text-story-lightBlue transition-colors"
            onClick={() => console.log('Like')}
          >
            <Heart size={24} />
          </button>
          <button 
            className="text-white hover:text-story-lightBlue transition-colors"
            onClick={() => console.log('Comment')}
          >
            <MessageCircle size={24} />
          </button>
          <button 
            className="text-white hover:text-story-lightBlue transition-colors"
            onClick={() => console.log('Share')}
          >
            <Send size={24} />
          </button>
        </div>
        <button 
          className="text-white hover:text-story-lightBlue transition-colors"
          onClick={() => console.log('Save')}
        >
          <Bookmark size={24} />
        </button>
      </div>
    </>
  );
};

export default StoryControls;
