import { useState, useEffect } from "react";
import { Mic, MicOff, User, Volume2 } from "lucide-react";
import { cn } from "@ui/lib/utils";
import ReactPlayer from "react-player";
interface ParticipantTileProps {
  name: string;
  isSpeaking?: boolean;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
  videoSrc?: MediaStream;
  isLocal?: boolean;
  className?: string;
  onClick?: () => void;
}

const ParticipantTile = ({
  name,
  isSpeaking = false,
  isAudioEnabled = true,
  isVideoEnabled = true,
  videoSrc,
  isLocal = false,
  className,
  onClick,
}: ParticipantTileProps) => {
  const [hasVideoLoaded, setHasVideoLoaded] = useState(!!videoSrc && isVideoEnabled);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'medium' | 'poor'>('good');

  useEffect(() => {
    setHasVideoLoaded(!!videoSrc && isVideoEnabled);
  }, [videoSrc, isVideoEnabled]);


  useEffect(() => {
    if (!isLocal) {
      const interval = setInterval(() => {
        const qualities = ['good', 'medium', 'poor'] as const;
        const nextQuality = qualities[Math.floor(Math.random() * 10) % 3];
        setConnectionQuality(nextQuality);
      }, 10000); 
      
      return () => clearInterval(interval);
    }
  }, [isLocal]);

 
  const getConnectionColor = () => {
    switch (connectionQuality) {
      case 'good':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-green-500';
    }
  };

  const getNameDisplayText = () => {
    if (isLocal) {
      return "You";
    }
    return name;
  };

  const avatarColors = [
    "bg-blue-600",
    "bg-green-600", 
    "bg-purple-600",
    "bg-pink-600",
    "bg-indigo-600",
  ];
  

  const getAvatarColor = () => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return avatarColors[sum % avatarColors.length];
  };

  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden bg-videocall-darker-purple animate-fade-in",
        isSpeaking && "ring-2 ring-videocall-active",
        className,
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >

      {hasVideoLoaded ? (
         (
          <ReactPlayer
            url={videoSrc}
            playing={isVideoEnabled}
            muted={isLocal}
            width="100%"
            height="100%"
            className="rounded-xl"
            onReady={() => setHasVideoLoaded(true)}
          />
        )
      ) : (
        <div className={cn("w-full h-full flex items-center justify-center", getAvatarColor())}>
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
              <User className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            {!isVideoEnabled && (
              <p className="mt-2 text-white/80 text-sm">Camera off</p>
            )}
          </div>
        </div>
      )}


      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 backdrop-blur-sm flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-sm font-medium truncate">
            {getNameDisplayText()}
          </span>
          {!isLocal && (
            <div className={cn("ml-2 w-2 h-2 rounded-full", getConnectionColor())} 
                 title={`Connection quality: ${connectionQuality}`} />
          )}
        </div>
        {!isAudioEnabled && (
          <MicOff className="h-4 w-4 text-red-500" />
        )}
      </div>


      {isSpeaking && isAudioEnabled && (
        <div className="absolute top-2 right-2">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-videocall-active rounded-full animate-pulse-ring opacity-75"></div>
            <Volume2 className="h-4 w-4 text-white relative z-10" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantTile;
