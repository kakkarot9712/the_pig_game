export type ClientMessageType = "CREATE_ROOM" | "JOIN_ROOM" | "MESSAGE" | "LEAVE_ROOM" | "PING";
export type ServerMessageType = "PONG" | "ROOM_JOINED" | "ROOM_CREATED" | "ROOM_LEFT" | "MESSAGE";

export interface ClientMessage {
    Type: ClientMessageType,
    Data: string,
    Room: string
}

export interface ServerMessage {
    Type: ServerMessageType,
    Data: string,
    Room: string
}

export enum ConnectionModes {
    CreateRoom = 1,
    JoinRoom = 2
}
