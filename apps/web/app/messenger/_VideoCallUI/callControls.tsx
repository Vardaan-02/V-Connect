import { useState } from "react";
import { Button } from "@ui/components/ui/button";
import { Mic, MicOff, Video, VideoOff, Phone, Users, MessageCircle } from "lucide-react";
import { cn } from "@ui/lib/utils";

interface CallControlsProps {
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  onToggleParticipants?: () => void;
  onToggleChat?: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  className?: string;
}

const CallControls = ({
  onToggleAudio,
  onToggleVideo,
  onEndCall,
  onToggleParticipants,
  onToggleChat,
  isAudioEnabled,
  isVideoEnabled,
  className,
}: CallControlsProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-2 md:gap-4 p-3 rounded-lg bg-videocall-darker-purple/90", className)}>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "rounded-full h-12 w-12 border-2",
          !isAudioEnabled ? "bg-red-500 hover:bg-red-600 border-red-500" : "bg-gray-700 hover:bg-gray-600 border-gray-700"
        )}
        onClick={onToggleAudio}
      >
        {isAudioEnabled ? (
          <Mic className="h-6 w-6 text-white" />
        ) : (
          <MicOff className="h-6 w-6 text-white" />
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "rounded-full h-12 w-12 border-2",
          !isVideoEnabled ? "bg-red-500 hover:bg-red-600 border-red-500" : "bg-gray-700 hover:bg-gray-600 border-gray-700"
        )}
        onClick={onToggleVideo}
      >
        {isVideoEnabled ? (
          <Video className="h-6 w-6 text-white" />
        ) : (
          <VideoOff className="h-6 w-6 text-white" />
        )}
      </Button>

      <Button
        variant="destructive"
        size="icon"
        className="rounded-full h-12 w-12 bg-videocall-end-call hover:bg-red-700"
        onClick={onEndCall}
      >
        <Phone className="h-6 w-6 text-white rotate-225" />
      </Button>

      {onToggleParticipants && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-gray-700 hover:bg-gray-600 border-gray-700 border-2"
          onClick={onToggleParticipants}
        >
          <Users className="h-6 w-6 text-white" />
        </Button>
      )}

      {onToggleChat && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-gray-700 hover:bg-gray-600 border-gray-700 border-2"
          onClick={onToggleChat}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
};

export default CallControls;
