import { useState } from "react";
import ParticipantTile from "./participantsTiles";
import { useIsMobile } from "@hooks/isMobile"
import { Maximize2, PictureInPicture } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { Participant } from "../_chatUI/chatArea";
interface VideoContainerProps {
  participants: Participant[];
  className?: string;
}

const VideoContainer = ({ participants, className }: VideoContainerProps) => {
  const isMobile = useIsMobile();
  const [isPipMode, setIsPipMode] = useState(false);
  const [focusedParticipant, setFocusedParticipant] = useState<string | null>(null);
  
  const callParticipants = participants.slice(0, 2);
  
  const sortedParticipants = [...callParticipants].sort((a, b) => {
    if (a.isLocal && !b.isLocal) return -1;
    if (!a.isLocal && b.isLocal) return 1;
    if (a.isSpeaking && !b.isSpeaking) return -1;
    if (!a.isSpeaking && b.isSpeaking) return 1;
    return 0;
  });

  const remoteParticipant = sortedParticipants.find(p => !p.isLocal);
  const localParticipant = sortedParticipants.find(p => p.isLocal);

  const handleToggleFocus = (participantId: string) => {
    if (focusedParticipant === participantId) {
      setFocusedParticipant(null);
    } else {
      setFocusedParticipant(participantId);
    }
  };

  const togglePipMode = () => {
    setIsPipMode(!isPipMode);
  };

  if (sortedParticipants.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-videocall-darker-purple/50 rounded-lg">
        <p className="text-white text-lg">Waiting for participants to join...</p>
      </div>
    );
  }

  if (sortedParticipants.length === 1 || sortedParticipants.length === 2) {
    return (
      <div className={cn("relative w-full", className)}>
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          {focusedParticipant ? (
            <ParticipantTile
              key={sortedParticipants.find(p => p.id === focusedParticipant)?.id}
              name={sortedParticipants.find(p => p.id === focusedParticipant)?.name || ""}
              isSpeaking={sortedParticipants.find(p => p.id === focusedParticipant)?.isSpeaking || false}
              isAudioEnabled={sortedParticipants.find(p => p.id === focusedParticipant)?.isAudioEnabled || false}
              isVideoEnabled={sortedParticipants.find(p => p.id === focusedParticipant)?.isVideoEnabled || false}
              videoSrc={sortedParticipants.find(p => p.id === focusedParticipant)?.videoSrc}
              isLocal={sortedParticipants.find(p => p.id === focusedParticipant)?.isLocal || false}
              className="h-full w-full"
            />
          ) : remoteParticipant ? (
            <ParticipantTile
              key={remoteParticipant.id}
              name={remoteParticipant.name}
              isSpeaking={remoteParticipant.isSpeaking}
              isAudioEnabled={remoteParticipant.isAudioEnabled}
              isVideoEnabled={remoteParticipant.isVideoEnabled}
              videoSrc={remoteParticipant.videoSrc}
              isLocal={remoteParticipant.isLocal}
              className="h-full w-full"
            />
          ) : (
            <ParticipantTile
              key={localParticipant?.id}
              name={localParticipant?.name || "You"}
              isSpeaking={localParticipant?.isSpeaking || false}
              isAudioEnabled={localParticipant?.isAudioEnabled || false}
              isVideoEnabled={localParticipant?.isVideoEnabled || false}
              videoSrc={localParticipant?.videoSrc}
              isLocal={true}
              className="h-full w-full"
            />
          )}
        </div>
        {sortedParticipants.length > 1 && (
          <div 
            className={cn(
              "absolute transition-all duration-300 ease-in-out overflow-hidden rounded-lg border-2 border-videocall-active shadow-lg cursor-pointer",
              isPipMode ? "bottom-4 right-4 w-1/4 h-auto" : "bottom-4 right-4 w-1/3 h-auto md:w-1/4"
            )}
            onClick={() => handleToggleFocus(
              focusedParticipant 
                ? (localParticipant?.id === focusedParticipant ? (remoteParticipant?.id || "") : localParticipant?.id || "") 
                : localParticipant?.id || ""
            )}
          >
            <ParticipantTile
              key={focusedParticipant 
                ? (localParticipant?.id === focusedParticipant ? remoteParticipant?.id : localParticipant?.id)
                : localParticipant?.id}
              name={focusedParticipant 
                ? (localParticipant?.id === focusedParticipant ? remoteParticipant?.name : localParticipant?.name || "You") 
                : localParticipant?.name || "You"}
              isSpeaking={focusedParticipant 
                ? (localParticipant?.id === focusedParticipant 
                  ? remoteParticipant?.isSpeaking || false 
                  : localParticipant?.isSpeaking || false)
                : localParticipant?.isSpeaking || false}
              isAudioEnabled={focusedParticipant 
                ? (localParticipant?.id === focusedParticipant 
                  ? remoteParticipant?.isAudioEnabled || false 
                  : localParticipant?.isAudioEnabled || false)
                : localParticipant?.isAudioEnabled || false}
              isVideoEnabled={focusedParticipant 
                ? (localParticipant?.id === focusedParticipant 
                  ? remoteParticipant?.isVideoEnabled || false 
                  : localParticipant?.isVideoEnabled || false)
                : localParticipant?.isVideoEnabled || false}
              videoSrc={focusedParticipant 
                ? (localParticipant?.id === focusedParticipant 
                  ? remoteParticipant?.videoSrc 
                  : localParticipant?.videoSrc)
                : localParticipant?.videoSrc}
              isLocal={focusedParticipant 
                ? (localParticipant?.id === focusedParticipant ? false : true)
                : true}
              className="aspect-video w-full"
            />
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-black/30 border-none hover:bg-black/50 text-white"
            onClick={togglePipMode}
          >
            <PictureInPicture className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-black/30 border-none hover:bg-black/50 text-white"
            onClick={() => handleToggleFocus(focusedParticipant ? "" : (remoteParticipant?.id || localParticipant?.id || ""))}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-2 gap-2 md:gap-4 w-full ${className}`}>
      {sortedParticipants.map((participant) => (
        <ParticipantTile
          key={participant.id}
          name={participant.name}
          isSpeaking={participant.isSpeaking}
          isAudioEnabled={participant.isAudioEnabled}
          isVideoEnabled={participant.isVideoEnabled}
          videoSrc={participant.videoSrc}
          isLocal={participant.isLocal}
          className="aspect-video"
        />
      ))}
    </div>
  );
};

export default VideoContainer;
