import { useState } from "react";
import { Button } from "@ui/components/ui/button";
import { Textarea } from "@ui/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/components/ui/tooltip";
import { Smile, Paperclip, Image, Send } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { useChats } from "@providers/stateClient/chatClient";

interface MessageInputProps {
  disabled?: boolean;
}

export const MessageInput = ({ disabled = false }: MessageInputProps) => {
  const {onSendMessage}=useChats();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const emojis = ["😊", "👍", "❤️", "🎉", "🔥", "😂", "😎", "🙌"];
  
  return (
    <div className={cn("border-t bg-black p-4", disabled && "opacity-75")}>
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Select a chat to start messaging" : "Type a message..."}
          className="min-h-[80px] resize-none pr-12 bg-secondary/20"
          disabled={disabled}
        />
        
        <div className="absolute bottom-3 right-3 flex gap-1">
          <div className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  disabled={disabled}
                >
                  <Smile size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Add emoji</TooltipContent>
            </Tooltip>
            
            {showEmojiPicker && !disabled && (
              <div className="absolute bottom-full right-0 mb-2 p-2 bg-blue-700 border rounded-lg shadow-lg flex flex-wrap gap-2 scale-in z-10">
                {emojis.map(emoji => (
                  <button
                    key={emoji}
                    className="text-xl hover:bg-gray-400/20 p-1 rounded"
                    onClick={() => {
                      setMessage(prev => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
                disabled={disabled}
              >
                <Paperclip size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach file</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
                disabled={disabled}
              >
                <Image size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach image</TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="flex justify-end mt-2">
        <Button 
          onClick={handleSend} 
          disabled={!message.trim() || disabled} 
          className="gap-1.5"
        >
          <Send size={16} />
          <span>Send</span>
        </Button>
      </div>
    </div>
  );
};
