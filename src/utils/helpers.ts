import { ClientMessage, ClientMessageType, ServerMessage } from "../types/ws"

export const configureWsClient = (room: string, ws: WebSocket) => {
    return (data: string, type: ClientMessageType) => {
        const rawRes: ClientMessage = {Data: data, Room: room, Type: type};
        ws.send(JSON.stringify(rawRes));
    }
}

export const parseServerResponse = (data: string) => {
    return JSON.parse(data) as ServerMessage;
}
