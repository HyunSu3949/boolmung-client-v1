import { SocketUserInfo, SocketSendMessage } from "src/types/index";

export const SOCKET_CONNECT = "connect";
export const SOCKET_DISCONNECT = "disconnect";
export const SOCKET_CHAT = "chat";
export const SOCKET_JOIN = "join";
export const SOCKET_RECIEVE_DISCONNECT = "disconnect";
export const SOCKET_RECIEVE_CHAT = "chat";
export const SOCKET_RECIEVE_JOIN = "join";

export const connectSocket = ({ _id, roomId, name }: SocketUserInfo) => ({
  type: SOCKET_CONNECT,
  payload: { _id, roomId, name },
});
export const sendMessage = ({
  message,
  _id,
  roomId,
  name,
}: SocketSendMessage) => ({
  type: SOCKET_CHAT,
  payload: { message, _id, roomId, name },
});

export const disconnectSocket = ({ _id, roomId, name }: SocketUserInfo) => ({
  type: SOCKET_DISCONNECT,
  payload: { _id, roomId, name },
});
