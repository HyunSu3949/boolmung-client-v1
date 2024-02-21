import {
  SocketUserInfo,
  SocketSendMessage,
  SocketReceiveMessage,
} from "src/types/index";

export const eventName = {
  SOCKET_CONNECT: "socket/connect",
  SOCKET_DISCONNECT: "socket/disconnect",
  SOCKET_CHAT: "socket/sendMessage",
  SOCKET_JOIN: "socket/join",
  SOCKET_RECIEVE_DISCONNECT: "socket/disconnect",
  SOCKET_RECIEVE_CHAT: "socket/chat",
  SOCKET_RECIEVE_JOIN: "socket/join",
};

export const connectSocket = ({ _id, roomId, name }: SocketUserInfo) => ({
  type: eventName.SOCKET_CONNECT,
  payload: { _id, roomId, name },
});

export const sendMessage = ({
  message,
  _id,
  roomId,
  name,
}: SocketSendMessage) => ({
  type: eventName.SOCKET_CHAT,
  payload: { message, _id, roomId, name },
});

export const receiveMessage = ({ message, type }: SocketReceiveMessage) => ({
  type: eventName.SOCKET_RECIEVE_CHAT,
  payload: { message, type },
});

export const disconnectSocket = ({ _id, roomId, name }: SocketUserInfo) => ({
  type: eventName.SOCKET_DISCONNECT,
  payload: { _id, roomId, name },
});
