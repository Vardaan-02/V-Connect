import { useState } from "react";
import { Sidebar} from "./sidebar";
import { ChatItem } from "@providers/stateClient/types";
import { ChatArea } from "./chatArea";
import { useIsMobile } from "@hooks/isMobile";
import { Button } from "@ui/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { useChats } from "@providers/stateClient/chatClient";
import Loader from "app/loading";
import { useUser } from "@providers/stateClient/userClient";

export const ChatLayout = () => {
 const {isLoading}=useChats();
 const {isLoading:isLoad}=useUser();
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);  
  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };
  if(isLoading||isLoad){
   return (
    <Loader></Loader>
   )
  }
  return (
    <div className="h-[100dvh] flex overflow-hidden bg-black text-white">
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 transition-transform duration-300 ease-in-out",
          isMobile && !showSidebar ? "-translate-x-full" : "translate-x-0",
          !isMobile && "relative z-auto"
        )}
      >
        <Sidebar />
        {isMobile && showSidebar && (
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-4 right-2 text-sidebar-foreground"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </Button>
        )}
      </div>
            <div className="flex-1 flex flex-col overflow-hidden">
        {isMobile && !showSidebar && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 left-2 z-10"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </Button>
        )}
        
        <ChatArea />
      </div>
      
      {isMobile && showSidebar && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-10"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};
