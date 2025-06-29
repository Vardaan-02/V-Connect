import { useToast } from "@hooks/useToast";
import { useChats } from "@providers/stateClient/chatClient";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import peerService from "./peerService";
import { useUser } from "@providers/stateClient/userClient";
import { Participant } from "app/messenger/_chatUI/chatArea";
import { WebSocket } from "http";

interface PeerContextType {
    myStream: MediaStream | undefined;
    remoteStream: MediaStream | undefined;
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    participants: Participant[];
    handleEndCall: () => void;
    toggleAudio: () => void;
    toggleVideo: () => void;
    sendIncomingCall: () => Promise<void>;
    handleIncommingCall: (data: { from: string; offer: RTCSessionDescriptionInit }) => Promise<void>;
    formatDuration: (seconds: number) => string;
}

const PeerContext = createContext<PeerContextType>({
    myStream: undefined,
    remoteStream: undefined,
    isAudioEnabled: true,
    isVideoEnabled: true,
    participants: [],
    handleEndCall: () => {},
    toggleAudio: () => {},
    toggleVideo: () => {},
    sendIncomingCall: async () => {},
    handleIncommingCall: async () => {},
    formatDuration: (seconds: number) => "",
});

export default function PeerProvider({ children }: { children: React.ReactNode }) {
    const { websocket, activeChat } = useChats();
    const { currentUser } = useUser();
    const [myStream, setMyStream] = useState<MediaStream | undefined>();
    const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    const toggleAudio = useCallback(() => {
        if (!myStream) return;

        const audioTracks = myStream.getAudioTracks();
        const newEnabledState = !isAudioEnabled;

        audioTracks.forEach(track => {
            track.enabled = newEnabledState;
        });

        setIsAudioEnabled(newEnabledState);
        setParticipants(prev =>
            prev.map(p => (p.isLocal ? { ...p, isAudioEnabled: newEnabledState } : p))
        );
    }, [myStream, isAudioEnabled]);

    const toggleVideo = useCallback(() => {
        if (!myStream) return;

        const videoTracks = myStream.getVideoTracks();
        const newEnabledState = !isVideoEnabled;

        videoTracks.forEach(track => {
            track.enabled = newEnabledState;
        });

        setIsVideoEnabled(newEnabledState);
        setParticipants(prev =>
            prev.map(p => (p.isLocal ? { ...p, isVideoEnabled: newEnabledState } : p))
        );
    }, [myStream, isVideoEnabled]);

    const sendIncomingCall = useCallback(async () => { 
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peerService.getOffer();
        // websocket.send(
        //     JSON.stringify({
        //         type: "initiate_call",
        //         roomId: activeChat.id,
        //         userId: currentUser.id,
        //         data: offer,
        //     })
        // );
        setMyStream(stream);
        setParticipants([
            {
                id: currentUser.id,
                name: currentUser.name,
                isSpeaking: false,
                isAudioEnabled: true,
                isVideoEnabled: true,
                videoSrc: stream.getVideoTracks()[0].enabled ? stream : undefined,
                isLocal: true,
            },
        ]);
        peerService.setLocalDescription(offer);
        
    }, [websocket, activeChat?.id]);

    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            console.log(`Incoming Call`, from, offer);
            setParticipants([
                {
                    id: from,
                    name: from,
                    isSpeaking: false,
                    isAudioEnabled: true,
                    isVideoEnabled: true,
                    videoSrc: stream.getVideoTracks()[0].enabled ? stream : undefined,
                    isLocal: false,
                },
            ]);
            
            peerService.setRemoteDescription(offer);
            
            const ans = await peerService.getAnswer(offer);
            websocket.send(
                JSON.stringify({
                    type: "answer_call",
                    roomId: activeChat.id,
                    userId: currentUser.id,
                    data: ans,
                })
            );
        },
        [websocket, activeChat?.id]
    );

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peerService.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peerService.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [sendStreams]
    );

    const handleEndCall = () => {
        setRemoteStream(undefined);
        setMyStream(undefined);
        setParticipants([]);
        peerService.peer.close();
        peerService.peer = null;
    };

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [
            hours > 0 ? hours.toString().padStart(2, "0") : null,
            minutes.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ]
            .filter(Boolean)
            .join(":");
    };

    useEffect(() => {
        peerService.peer.addEventListener("track", async ev => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    const memoizedParticipants = useMemo(() => participants, [participants]);
    useEffect(() => {
        if(websocket){
        websocket.onmessage=(message)=>{
            const data = JSON.parse(message.data);
            console.log("WebSocket message received:", data);
            if (data.type === "incoming_call") {
                const payload={
                    from: data.userId,
                    offer: data.data,
                }
                console.log("Incoming call payload", payload);
                handleIncommingCall(payload);
            }
            if (data.type === "call_answered") {
                handleCallAccepted(data);
            }
            if (data.type === "call_hungup") {
                handleEndCall();
            }
        }
    }
       
      }, [
       websocket
      ]);
    return (
        <PeerContext.Provider
            value={{
            myStream,
            remoteStream,
            isAudioEnabled,
            isVideoEnabled,
            participants: memoizedParticipants,
            handleEndCall,
            toggleAudio,
            toggleVideo,
            sendIncomingCall,
            handleIncommingCall,
            formatDuration,
            }}
        >
            {children}
        </PeerContext.Provider>
    );
}

export const usePeer = () => useContext(PeerContext);