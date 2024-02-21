import { Middleware } from "@reduxjs/toolkit";
import { Manager, Socket } from "socket.io-client";

import { setMessageList } from "src/redux/features/socketSlice";
import { SocketReceiveMessage } from "src/types/index";

const URL = (
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SOCKET_DOMAIN
    : process.env.REACT_APP_PROD_SOCKET_DOMAIN
) as string;
const ROOM = "/chat";
const eventName = {
  SOCKET_CONNECT: "socket/connect",
  SOCKET_DISCONNECT: "socket/disconnect",
  SOCKET_REDOAD: "socket/reload",
  SOCKET_LEAVE: "socket/leave",
  SOCKET_CHAT: "socket/sendMessage",
  SOCKET_JOIN: "socket/join",
  SOCKET_RECIEVE_DISCONNECT: "socket/disconnect",
  SOCKET_RECIEVE_CHAT: "socket/chat",
  SOCKET_RECIEVE_JOIN: "socket/join",
};

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  const { dispatch } = store;
  return (next) => (action: any) => {
    switch (action.type) {
      case eventName.SOCKET_CONNECT:
        const manager = new Manager(URL, {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
        });
        socket = manager.socket(ROOM);

        socket.on(eventName.SOCKET_CHAT, (data: SocketReceiveMessage) => {
          dispatch(setMessageList(data));
        });

        socket.emit(eventName.SOCKET_JOIN, {
          type: "system",
          _id: action.payload._id,
          name: action.payload.name,
          roomId: action.payload.roomId,
        });
        break;

      case eventName.SOCKET_DISCONNECT:
        socket.disconnect();
        break;

      case eventName.SOCKET_CHAT:
        socket.emit(eventName.SOCKET_CHAT, action.payload);
        break;

      default:
        break;
    }

    return next(action);
  };
};
