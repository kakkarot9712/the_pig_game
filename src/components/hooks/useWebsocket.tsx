import { useEffect, useState } from "react";
import { ConnectionModes } from "../../types/ws";
import { parseServerResponse } from "../../utils/helpers";

export default function useWebsocket(url: string) {
    const [selectedMode, setSelectedMode] = useState<ConnectionModes | null>(null);
    const [ws, setWs] = useState<WebSocket>();
    const [room, setRoom] = useState<string | null>();
    const [player2Id, setPlayer2Id] = useState<string|null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);
    // const [player2Id]

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
                setRoom(room);
            } else if (res.Type === "ROOM_JOINED") {
                if(res.From !== connectionId) setPlayer2Id(res.From);
                // alert("Both connected!")
                // TODO: Change UI for Start Playing
            } else if (res.Type === "ROOM_LEFT") {
                // TODO: Cleanup and Exit Game
            } else if (res.Type === "PONG") {
                // Connection working
                setWs(ws);
                setConnectionId(res.From);
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
        if (selectedMode && ws) {
            if (selectedMode === ConnectionModes.CreateRoom) {
                !room && ws.send(JSON.stringify({ Type: "CREATE_ROOM" }));
            } else {
                room && ws.send(JSON.stringify({ Type: "JOIN_ROOM", Data: room }));
                // TODO: Join Room
            }
        }
    }, [selectedMode, ws, room])

    return { setSelectedMode, setRoom, selectedMode, room, connectionId, player2Id }
}