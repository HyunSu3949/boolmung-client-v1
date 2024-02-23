import { Middleware } from "@reduxjs/toolkit";
import { Manager, Socket } from "socket.io-client";

import {
  getRoomInfo,
  join,
  move,
  setError,
  setMessageList,
} from "src/redux/features/socketSlice";
import { SocketReceiveMessage } from "src/types/index";

const URL = (
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_DOMAIN
    : process.env.REACT_APP_PROD_DOMAIN
) as string;
const ROOM = "/chat";
const eventName = {
  CONNECT: "socket/connect",
  DISCONNECT: "socket/disconnect",
  CHAT: "socket/sendMessage",
  JOIN: "socket/join",
  MOVE: "socket/move",
  FULL: "socket/full",
  NOTFOUND: "socket/notfound",
  GET_ROOM_INFO: "socket/getRoomInfo",
  LEAVE: "socket/leave",
};

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  const { dispatch } = store;
  return (next) => (action: any) => {
    switch (action.type) {
      case eventName.CONNECT:
        const manager = new Manager(URL, {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
        });
        socket = manager.socket(ROOM);

        // 이벤트 등록
        socket.on(eventName.CHAT, (data: SocketReceiveMessage) => {
          dispatch(setMessageList(data));
        });

        socket.on(eventName.MOVE, (data: any) => {
          dispatch(move(data));
        });

        socket.on(eventName.JOIN, (data: any) => {
          dispatch(join(data));
        });

        socket.on(eventName.GET_ROOM_INFO, (data: any) => {
          dispatch(getRoomInfo(data));
        });

        socket.on(eventName.NOTFOUND, (data: any) => {
          const { message } = data;
          dispatch(setError({ errorState: true, message }));
        });

        socket.on(eventName.FULL, (data: any) => {
          const { message } = data;
          dispatch(setError({ errorState: true, message }));
        });

        // 참여 메세지 전송
        socket.emit(eventName.JOIN, {
          type: "system",
          image: action.payload.image,
          _id: action.payload._id,
          name: action.payload.name,
          roomId: action.payload.roomId,
        });

        break;

      case eventName.DISCONNECT:
        socket.disconnect();
        break;

      case eventName.CHAT:
        socket.emit(eventName.CHAT, action.payload);
        break;

      case eventName.MOVE:
        socket.emit(eventName.MOVE, action.payload);
        break;

      case eventName.GET_ROOM_INFO:
        break;

      default:
        break;
    }

    return next(action);
  };
};
