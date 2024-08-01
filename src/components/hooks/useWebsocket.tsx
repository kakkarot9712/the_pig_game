import { useEffect, useState } from "react";
import { ClientMessageType, ConnectionModes } from "../../types/ws";
import { configureWsClient, parseServerResponse } from "../../utils/helpers";

export default function useWebsocket(url: string) {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoaing, setIsLoading] = useState(false);
    const [selectedMode, setSelectedMode] = useState<ConnectionModes | null>(null);
    const [ws, setWs] = useState<WebSocket>();
    const [room, setRoom] = useState<string | null>();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(url);
        ws.onerror = console.error;
        ws.onopen = () => {
            console.log("Connection Opened!");
            ws.send(JSON.stringify({ Type: "PING" }));
        }
        ws.onmessage = (m) => {
            const res = parseServerResponse(m.data);
            if (res.Type === "ROOM_CREATED") {
                const room = res.Room;
                setIsLoading(false);
                setRoom(room);
            } else if (res.Type === "ROOM_JOINED") {
                // TODO: Change UI for Start Playing
            } else if (res.Type === "ROOM_LEFT") {
                // TODO: Cleanup and Exit Game
            } else if (res.Type === "PONG") {
                // Connection working
                setIsConnected(true);
                setWs(ws);
            } else {
                // TODO: Normal Message
            }
        }
        ws.onclose = (e) => {
            console.warn("Connection Closed:", e);
        }

        return () => {
            ws && ws.close();
        }
    }, [])

    useEffect(() => {
        if (selectedMode && isConnected && ws) {
            setIsLoading(true);
            if (selectedMode === ConnectionModes.CreateRoom && !room) {
                ws.send(JSON.stringify({ Type: "CREATE_ROOM" }));
            } else {
                // if(room) ws.send(JSON.stringify({Type: "JOIN_ROOM", Room: room}));
                // TODO: Join Room
            }
        }
    }, [selectedMode, isConnected, ws, room])

    return { isConnected, setSelectedMode, setRoom, selectedMode, room, isLoaing, isReady }
}