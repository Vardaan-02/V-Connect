import { useState } from "react";
import { UserAvatar } from "./avatar";
import { Button } from "@ui/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/components/ui/tooltip"
import { Smile, Share, MoreHorizontal } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { MessageProps } from "@providers/stateClient/types";
import { useChats } from "@providers/stateClient/chatClient";



const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

export const Message = ({ 
  id, 
  content, 
  sender, 
  activeChatId,
  reactions = [], 
  isOwnMessage = false,
  onReactionAdd,
  onShare
}: MessageProps) => {
  const [showActions, setShowActions] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const {wsLoading,handleAddReaction:handleReaction} = useChats();
  // const formattedTime = new Intl.DateTimeFormat('en-US', {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   hour12: true
  // }).format(timestamp);
  const handleSharePost = () => {
    if (onShare) {
      onShare(id);
    }
    console.log("Sharing message:", id);
  };

  const handleAddReaction = (emoji: string) => {
      handleReaction(activeChatId,id,emoji);
    
    console.log("Adding reaction", emoji, "to message:", id);
    setShowReactionPicker(false);
  };

  return (
    <div 
      className={cn(
        "group flex gap-3 py-2 px-4 hover:bg-blue-700/10 rounded-md transition-colors animate-in",
        isOwnMessage ? "flex-row-reverse" : ""
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowReactionPicker(false);
      }}
    >
      <UserAvatar 
        src={sender.avatar} 
        fallback={sender.name.substring(0, 2).toUpperCase()}
      />
      
      <div className={cn("flex flex-col max-w-[75%]", isOwnMessage ? "items-end" : "")}>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("font-medium text-sm", isOwnMessage ? "order-2" : "")}>
            {sender.name}
          </span>
          <span className={cn("text-xs text-gray-500", isOwnMessage ? "order-1" : "")}>
            {/* {formattedTime} */}
          </span>
        </div>
        
        <div className={cn(
          "bg-black p-3 rounded-lg",
          isOwnMessage ? "bg-gray-800 text-white" : ""
        )}>
          <p className="text-sm">{content}</p>
        </div>
        
        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {reactions.map((reaction, index) => (
              <button 
                key={`${reaction.emoji}-${index}`}
                className={cn(
                  "flex items-center gap-1 text-xs py-0.5 px-1.5 rounded-full",
                  reaction.reacted 
                    ? "bg-accent/20 text-gray-900 hover:bg-black/30" 
                    : "bg-secondary/50 text-gray-500 hover:bg-blue-900/80"
                )}
                onClick={() => handleAddReaction(reaction.emoji)}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
        
        {/* Message actions */}
        {showActions && (
          <div 
            className={cn(
              "flex items-center gap-1 mt-1 scale-in",
              isOwnMessage ? "justify-end" : ""
            )}
          >
            {/* Reaction button */}
            <div className="relative">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 rounded-full"
                onClick={() => {
                  setShowReactionPicker(!showReactionPicker)
                }}
              >
                <Smile size={16} />
              </Button>
              
              {/* Reaction picker */}
                {showReactionPicker && (
                <div className="absolute bottom-full mb-2 bg-card border shadow-lg rounded-lg p-1.5 flex gap-1 scale-in z-10">
                  {reactionEmojis.map(emoji => (
                  <button
                    key={emoji}
                    className={cn(
                    "text-lg hover:bg-accent/20 p-1 rounded",
                    wsLoading ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    onClick={() => !wsLoading && handleAddReaction(emoji)}
                    disabled={!!wsLoading}
                  >
                    {emoji}
                  </button>
                  ))}
                </div>
                )}
            </div>
            
            {/* Share button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7 rounded-full"
                  onClick={handleSharePost}
                >
                  <Share size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Share message</TooltipContent>
            </Tooltip>
            
            {/* More actions button */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7 rounded-full"
            >
              <MoreHorizontal size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};


