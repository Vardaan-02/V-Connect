
import { useDebugValue, useEffect, useState } from "react";
import { UserAvatar } from "./avatar";
import { Button } from "@ui/components/ui/button";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { 
  MessageCircle, 
  Settings, 
  Search, 
  Bell, 
  User
} from "lucide-react";
import { cn } from "@ui/lib/utils";
import { useChats } from "@providers/stateClient/chatClient";
import { useUser } from "@providers/stateClient/userClient";

export const Sidebar = () => {
  const {chats,activeChat,setActiveChat}=useChats();
  const {currentUser}=useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats,setFilteredChats] =useState(chats);
  useEffect(()=>{
    setFilteredChats(() => {
      if (searchQuery === "") {
        return chats;
      }
      return chats.filter((chat) => {
        const chatName = chat.name.toLowerCase();
        const query = searchQuery.toLowerCase();
        return chatName.includes(query);
      });
    });
  },[searchQuery,chats])
  return (
    <div className="h-full bg-blue-900/20 text-white flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-semibold text-lg">PearlPost</h1>
        
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="text-white">
            <Bell size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="text-white">
            <Settings size={18} />
          </Button>
        </div>
      </div>
      
      <div className="px-4 pb-2">
        <div className="relative">
          <Search size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-blue-950/100 text-white rounded-md py-2 pl-8 pr-4 
              text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="py-2">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-1.5">
              <MessageCircle size={16} />
              <span className="text-sm font-medium">Chats</span>
            </div>
          </div>
          
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors slide-in",
                "hover:bg-blue-950/100 hover:text-sidebar-accent-foreground",
                activeChat?.id === chat.id && "bg-accent text-accent-foreground hover:bg-accent"
              )}
              onClick={() => {
               console.log(activeChat)
               setActiveChat(chat)
              console.log(activeChat)
             }}
            >
              <UserAvatar
                fallback={chat.name.substring(0, 2).toUpperCase()}
                src={chat.avatar}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm truncate">
                    {chat.name}
                  </span>
                </div>
                {/* {chat.lastSeen&& (
                  <p className="text-xs text-muted-foreground truncate">
                    Last seen:{' '}
                    {chat.lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )} */}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <button className="w-full flex items-center gap-3 hover:opacity-80">
          <UserAvatar
            fallback="ME"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm">{currentUser.name}</div>
            {/* <div className="text-xs text-muted-foreground">Online</div> */}
          </div>
          <User size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};
