import { useEffect, useState } from "react";
import { ClientMessageType, ConnectionModes } from "../../types/ws";
import { configureWsClient, parseServerResponse } from "../../utils/helpers";

export default function useWebsocket(url: string) {
    const [websocket, setWs] = useState<WebSocket | null>();
    const [selectedMode, setSelectedMode] = useState<ConnectionModes | null>(null);
    useEffect(() => {
        let ws: WebSocket;
        let sendMessage: (data: string, type: ClientMessageType) => void;

        if (selectedMode) {
            ws = new WebSocket(url);
            ws.onerror = console.error;
            ws.onopen = () => {
                console.log("Connection Opened!");
                ws.send(JSON.stringify({ Type: "PING" }));
            }
            ws.onmessage = (m) => {
                const res = parseServerResponse(m.data);
                if (res.Type === "ROOM_CREATED") {
                    const room = res.Room;
                    sendMessage = configureWsClient(room, ws);
                    // TODO: Change UI for Code Display
                } else if (res.Type === "ROOM_JOINED") {
                    const room = res.Room;
                    sendMessage = configureWsClient(room, ws);
                    // TODO: Change UI for Start Playing
                } else if (res.Type === "ROOM_LEFT") {
                    // TODO: Cleanup and Exit Game
                } else if (res.Type === "PONG") {
                    // Connection working
                    setWs(ws);
                } else {
                    // TODO: Normal Message
                }
            }
            ws.onclose = (e) => {
                console.warn("Connection Closed:", e);
                setWs(null);
            }
            if (selectedMode === ConnectionModes.CreateRoom) {
                // Create Room
            } else if (selectedMode === ConnectionModes.JoinRoom) {
                // Join Room
            }
        }
        return () => {
            ws && ws.close();
        }
    }, [selectedMode])

    return { websocket, setSelectedMode, selectedMode }
}