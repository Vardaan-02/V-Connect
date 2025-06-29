"use client"
import { Message } from "./messageBubble";
import { MessageInput } from "./chatInput";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { useChats } from "@providers/stateClient/chatClient";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@hooks/useToast";
import VideoContainer from "../_VideoCallUI/videoContainer";
import CallControls from "../_VideoCallUI/callControls";
import { Clock, MicOff, Video, VideoOff } from "lucide-react";
import { usePeer } from "@providers/webRtcClient/webrtcclient";
export interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  videoSrc?: MediaStream;
  isLocal: boolean;
}
export const ChatArea = () => {
  const {activeChat,wsLoading}=useChats();
  const { toast } = useToast();
  const [autoSwitchSpeaker, setAutoSwitchSpeaker] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const {isAudioEnabled,isVideoEnabled,handleEndCall,toggleAudio,toggleVideo,participants,sendIncomingCall,handleIncommingCall,formatDuration}=usePeer();
  const timerRef = useRef<number | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  
  async function startCall(){
    if (!activeChat) {
      toast("Select a chat to start a call");
      return;
    }
    setCallDuration(0);
    setIsCallActive(true);
    
    await sendIncomingCall();
    
    timerRef.current = window.setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    toast("Call started", {
      duration: 2000,
    });


    toast("Call Feature Will Be Available Soon, Sorry Gotta Do Other Stuff Too"
    )
  }
  function endCall(){
    handleEndCall();
    setIsCallActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    toast("Call ended", {
      duration: 2000,
    });
  }
 if(!isCallActive){
  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex items-center justify-between w-full">
        <h2 className="font-medium">{activeChat ? activeChat.name : "Select a chat"}</h2>
        <Video 
          className="h-6 w-6 text-blue-500"  
          onClick={() => {
            if (!isCallActive) {
              startCall();
            }
          }}
        />
      </div>
      
      <ScrollArea className="flex-1 px-2 overflow-y-auto">
        <div className="py-4">
          {activeChat && activeChat.messages?.map((message) => {
            return(
            <Message 
              key={message.id} 
              {...message} 
              onReactionAdd={message.onReactionAdd}
              activeChatId={activeChat.id}
            />
          )})}
          
          {!activeChat && (
            <div className="flex items-center justify-center h-full p-8">
              <p className="text-blue-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <MessageInput disabled={!activeChat||!!wsLoading}/>
      </div>
    </div>
  )
 }
  return (
    <div className="min-h-screen flex flex-col bg-videocall-darker-purple">
      <header className="bg-black/30 p-4 flex justify-between items-center text-white">
        <h1 className="text-lg font-medium">Video Call</h1>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-mono">{formatDuration(callDuration)}</span>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-4">
        <VideoContainer participants={participants} />
       
      </main>

      <footer className="p-4 flex justify-center">
        <CallControls
          onToggleAudio={toggleAudio}
          onToggleVideo={toggleVideo}
          onEndCall={endCall}
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          onToggleParticipants={() => {
            setAutoSwitchSpeaker(!autoSwitchSpeaker);
            toast(`Auto-switch speaker ${autoSwitchSpeaker ? "enabled" : "disabled"}`, {
              duration: 2000,
            });
          }}
          onToggleChat={() => toast("Chat feature coming soon!", {
            duration: 2000,
          })}
        />
      </footer>
      
      <div className="fixed bottom-20 left-4 flex flex-col items-start space-y-2">
        {!isAudioEnabled && (
          <div className="px-2 py-1 bg-red-500/70 rounded-md text-white text-xs flex items-center">
            <MicOff className="h-3 w-3 mr-1" /> Muted
          </div>
        )}
        {!isVideoEnabled && (
          <div className="px-2 py-1 bg-red-500/70 rounded-md text-white text-xs flex items-center">
            <VideoOff className="h-3 w-3 mr-1" /> Camera off
          </div>
        )}
        {participants.map((participant) => 
          !participant.isLocal && !participant.isAudioEnabled && (
            <div key={participant.id} className="px-2 py-1 bg-orange-500/70 rounded-md text-white text-xs flex items-center">
              <MicOff className="h-3 w-3 mr-1" /> {participant.name} is muted
            </div>
          )
        )}
      </div>
    </div>
  );
}
