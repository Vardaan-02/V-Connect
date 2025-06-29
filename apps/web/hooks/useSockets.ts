import { useEffect, useState } from "react";
import { WS_URL } from "@providers/wsClient";
import { useUser } from "@providers/stateClient/userClient";
export interface WebSocketState {
  connection: WebSocket | null;
  isConnected: boolean;
  roomId: string | null;
  userId: string | null;
}
export function useSocket(roomId: string) {
  const [loading4, setLoading] = useState(true);
  const [websocket, setSocket] = useState<WebSocket>();
  const { currentUser } = useUser();
  useEffect(() => {
    let ws: WebSocket | undefined;

    const connectSocket = () => {
      ws = new WebSocket(WS_URL);
      console.log("roomId", roomId);

      ws.onopen = () => {
        setLoading(false);
        setSocket(ws);
        ws?.send(JSON.stringify({ type: "join_room", roomId, user: currentUser }));
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setLoading(true);
      };
    };

    if (roomId && currentUser) {
      connectSocket();
    }

    console.log("Connecting to socket server...");
    return () => {
      ws?.close();
      setSocket(undefined);
      setLoading(true);
    };
  }, [roomId, currentUser]); 
  return { websocket, loading4 };
}