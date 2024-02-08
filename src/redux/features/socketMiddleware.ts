import { Middleware } from "@reduxjs/toolkit";
import { Manager, Socket } from "socket.io-client";

import {
  SOCKET_CONNECT,
  SOCKET_CHAT,
  SOCKET_JOIN,
  SOCKET_DISCONNECT,
} from "src/redux/features/socketActions";

const URL = (
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SOCKET_DOMAIN
    : process.env.REACT_APP_PROD_SOCKET_DOMAIN
) as string;
const ROOM = "/chat";

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action: any) => {
    const { dispatch } = store;

    switch (action.type) {
      case SOCKET_CONNECT:
        const manager = new Manager(URL, {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
        });
        socket = manager.socket(ROOM);

        socket.on(SOCKET_JOIN, (data) => {
          dispatch({ type: SOCKET_JOIN, payload: data });
        });

        socket.on(SOCKET_CHAT, (data) => {
          dispatch({ type: SOCKET_CHAT, payload: data });
        });

        break;

      case SOCKET_DISCONNECT:
        socket.disconnect();
        break;

      case SOCKET_CHAT:
        socket.emit(SOCKET_CHAT, action.payload);
        break;

      default:
        break;
    }

    return next(action);
  };
};
