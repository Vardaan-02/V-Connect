"use client"
import { useContext,createContext,useState, useEffect } from "react";
import { ChatItem, MessageProps } from "./types";
import { graphqlClient } from "@providers/graphqlClient";
import { CreateRoomMutation } from "graphql/mutation/room";
import { useUser } from "./userClient";
import { useGetRoomsById } from "@hooks/room";
import { useSocket } from "@hooks/useSockets";
import { useToast } from "@hooks/useToast";

interface ChatContextType {
  chats: ChatItem[];
  activeChat: ChatItem|null;
  isLoading:Boolean;
  wsLoading:Boolean;
  websocket:WebSocket;
  setActiveChat: (chat:ChatItem) => void;
  addChat: (userId:string) => void;
  removeChat: (chatId: string) => void;
  onSendMessage: (content: string) => void;
  handleAddReaction:(activeChatId:string,id:string,emoji:string)=>void;
  sendSignalingData:(userId:string,data:any,type:string)=>void;
}
const ChatContext = createContext({
  chats: [],
  activeChat: null,
  isLoading:true,
  wsLoading:true,
  websocket:undefined,
  setActiveChat: (chat:ChatItem) => {},
  addChat: (userId:string) => {},
  removeChat: (chatId: string) => {},
  onSendMessage: (content: string) => {},
  handleAddReaction:(activeChatId:string,id:string,emoji:string)=>{},
  sendSignalingData: (
    userId: string,
    data: any,
    type: string    
  ) => {}
} as ChatContextType);
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
 const [chats, setChats] = useState<ChatItem[]>([]);

 const [activeChat, setActiveChat] = useState<ChatItem>(null);
 const {currentUser,isLoading}=useUser();
 const [isLoad,setIsLoading]=useState(true);
 const {rooms,isLoading4}=useGetRoomsById();
 const {websocket,loading4}=useSocket(activeChat?.id as string);
 const {toast}=useToast();
 const setActiveChatId = (chat:ChatItem) => {
  setActiveChat(chat);
 };
 const handleAddReaction=(activeChatId:string,id:string,emoji:string)=>{
   if (!currentUser) {
     console.error("Current user is not defined");
     return;
   }
   setActiveChat((prevChat) => {
    if (!prevChat||loading4) {return prevChat};
    const updatedMessages = prevChat.messages.map((message) => {
      if (message.id === id) {
        const reactions = message.reactions || [];
        const existingReaction = reactions.find((reaction) => reaction.user.name === currentUser.name);
        if (existingReaction) {
          const updatedReactions = reactions.map((reaction) => {
            if (reaction.user.name === currentUser.name ) {
              return {
                ...reaction,
                count: reaction.count - 1,
                reacted: false,
              };
            }
            return reaction;
          });
          return {
            ...message,
            reactions: updatedReactions,
          };
        } else {
          const updatedReactions = reactions.some((reaction) => reaction.emoji === emoji)
            ? reactions.map((reaction) => {
                if (reaction.emoji === emoji) {
                  return {
                    ...reaction,
                    count: reaction.count + 1,
                    reacted: true,
                  };
                }
                return reaction;
              })
            : [
                ...reactions,
                {
                  emoji,
                  user: {
                    name: currentUser.name,
                    avatar: currentUser.profileImageURL || "",
                  },
                  count: 1,
                  reacted: true,
                },
              ];
          return {
            ...message,
            reactions: updatedReactions,
          };
        }
      }
      return message
    });
    
    console.log("Updated messages:", updatedMessages);
    const updatedChat = {
      ...prevChat,
      messages: updatedMessages,
    };
    setChats((prevChats) =>
      prevChats.map((chat) =>
     chat.id === updatedChat.id ? updatedChat : chat
      )
    );
    return updatedChat;
   });
   websocket.send(JSON.stringify({
    type: "reaction_in_room",
    roomId: activeChatId,
    userId: currentUser.id,
    messageId: id,
    reaction: emoji,
  }));

   console.log("Reaction added:",activeChatId, id, emoji);
    
   console.log("Updated chat:", activeChat);
 }
 const onShare=()=>{

 }

 const onSendMessage = (content: string) => {
      if (!activeChat||loading4) return;
      const newMessage: MessageProps = {
        id: `${activeChat.id}-${Date.now()}`,
        content,
        sender: {
          name: currentUser.name,
          avatar: currentUser.profileImageURL || "",
        },
        timestamp: new Date(),
        isOwnMessage: true,
        activeChatId: activeChat.id,
        reactions: []
      };
      websocket.send(JSON.stringify({
       type:"message_in_room",
       roomId: activeChat.id,
       userId:currentUser.id,
       message: content,
       imageURL: "",
      }))
      console.log("Sending message:", newMessage);
      setActiveChat((prevChat) => {
        if (!prevChat) return prevChat;
        const updatedChat = {
          ...prevChat,
          messages: [
       ...(prevChat.messages || []),
       newMessage,
          ],
        };
        setChats((prevChats) =>
          prevChats.map((chat) =>
       chat.id === updatedChat.id ? updatedChat : chat
          )
        );
        return updatedChat;
      });
 }
 const addChat = async(userId:string) => {
  const usersId=[userId,currentUser.id];
  await graphqlClient.request(CreateRoomMutation,{
      payload:{
          usersId
        }
  });
  const newChat: ChatItem = {
   id: userId,
   name: userId,
   avatar: "",
   lastSeen: new Date(),
   messages: [],
  };
  setChats((prev) => [...prev, newChat]);
 };
 const removeChat = (chatId: string) => {
  setChats((prev) => prev.filter((chat) => chat.id !== chatId));
 }
 useEffect(()=>{
  if(!isLoading && !isLoading4){
   setIsLoading(false);
  }
 },[isLoading,isLoading4]) 
 useEffect(()=>{
  if(!isLoading && rooms && !isLoading4&& currentUser){
   const userChats: ChatItem[] = rooms.map((room) => {
    return {
     id:room.id,
     name:room.users.filter((user)=>user.name!==currentUser.name)[0].name,
     avatar:room.users.filter((user)=>user.name!==currentUser.name)[0].profileImageURL,
     lastSeen:room.messages[0]?.createdAt,
     messages:room.messages.map((message) => ({
      id: message.id,
      content: message.text,
      imageURL: message.imageURL,
      sender:{
       name: message.author.name,
       avatar: message.author.profileImageURL,
      },
      activeChatId: room.id,
      timestamp: message.createdAt,
      isOwnMessage: message.author.name === currentUser.name,
      reactions: message.reactions?.map((reaction) => ({
       emoji: reaction.type,
       user: {
        name: reaction.author.name,
        avatar: reaction.author.profileImageURL,
       },
       count: message.reactions?.filter((r) => r.type === reaction.type).length,
       reacted: message.reactions?.some((r) => r.type === reaction.type && r.author.name === currentUser.name),
      })),
      onReactionAdd: handleAddReaction,
      onShare: onShare,
     })),
    }
   })
   setChats(userChats);
  }
 },[rooms,isLoading,isLoading4,currentUser])
 const sendSignalingData = (
  userId: string,
  data: any,
  type: string
): void => {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    const message = {
      type,
      userId,
      roomId: activeChat.id,
      data
    };
    websocket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket not connected, cannot send signaling data');
    toast("Connection error: Failed to send signaling data");
  }
};
 
 useEffect(()=>{
  if(!isLoading && !isLoading4 && activeChat){
   const chat = chats.find((chat) => chat.id === activeChat.id);
   if(chat){
    setActiveChat(chat);
   }
  }
 }
 , [chats,activeChat,isLoading,isLoading4])
 useEffect(()=>{
  if(loading4) return;
  websocket.onmessage=(event: MessageEvent)=>{
    const msg=JSON.parse(event.data);
    if(msg.type==="message_in_room"){
     const room= chats.find((chat) => chat.id === msg.roomId);
      const newMessage: MessageProps = {
        id: msg.messageId,
        content: msg.message,
        sender:{
          name: room.name,
          avatar: room.avatar,
        },
        timestamp: new Date(),
        isOwnMessage: false,
        activeChatId: activeChat.id,
        reactions: [],
      }
      setActiveChat((prevChat) => {
        if (!prevChat) return prevChat;
        const updatedChat = {
          ...prevChat,
          messages: [
       ...(prevChat.messages || []),
       newMessage,
          ],
        };
        setChats((prevChats) =>
          prevChats.map((chat) =>
       chat.id === updatedChat.id ? updatedChat : chat
          )
        );
        return updatedChat;
      });
    }
    else if(msg.type==="reaction_in_room"){
     const room = chats.find((chat) => chat.id === msg.roomId);
     if (!room) return;
     const message = room.messages.find((message) => message.id === msg.messageId);
     if (!message) return;
     const reactions = message.reactions || [];
     const existingReaction = reactions.find((reaction) => reaction.user.name === msg.userId);
     let updatedReactions=[];
     if (existingReaction) {
       updatedReactions = reactions.map((reaction) => {
         if (reaction.user.name === msg.userId) {
           return {
             ...reaction,
             count: reaction.count - 1,
             reacted: false,
           };
         }
         return reaction;
       });
       
     } else {
        updatedReactions = [
         ...reactions,
         {
           emoji: msg.reaction,
           user: {
             name: room.name,
             avatar: room.avatar,
           },
           count: 1,
           reacted: true,
         },
       ];
     }
     setActiveChat((prevChat) => {
      if (!prevChat) return prevChat;
      const updatedChat = {
       ...prevChat,
       messages: prevChat.messages.map((msg) =>
        msg.id === message.id ? { ...msg, reactions: updatedReactions } : msg
       ),
      };
      setChats((prevChats) =>
       prevChats.map((chat) =>
        chat.id === updatedChat.id ? updatedChat : chat
       )
      );
      return updatedChat;
     });
    }
  }
 },[loading4,websocket])

 return <ChatContext.Provider value={{chats,activeChat,isLoading:isLoad,wsLoading:loading4,websocket,setActiveChat:setActiveChatId,addChat,removeChat,onSendMessage,handleAddReaction,sendSignalingData}}>
  {children}
 </ChatContext.Provider>
}
export const useChats = () => useContext(ChatContext);