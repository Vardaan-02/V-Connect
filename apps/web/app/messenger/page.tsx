"use client";
import { useEffect } from "react";
import { ChatLayout } from "./_chatUI/chatLayout";
import { ChatProvider } from "@providers/stateClient/chatClient";
import PeerProvider from "@providers/webRtcClient/webrtcclient";

const Index = () => {
  return (
    <ChatProvider>
      <PeerProvider>
  <ChatLayout />;
  </PeerProvider>
  </ChatProvider>
  )
};

export default Index;
