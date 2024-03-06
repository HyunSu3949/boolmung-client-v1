import { createAction } from "@reduxjs/toolkit";

import { SocketSendMessage, ActionInfo } from "src/types/index";

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
  SENDINITIALPOS: "socket/initpos",
  SENDMOVE: "socket/sendMove",
};

export const sendMove = createAction<ActionInfo>(eventName.SENDMOVE);
export const connect = createAction<{
  _id: string;
  roomId: string;
  name: string;
  image: string;
}>(eventName.CONNECT);
export const leave = createAction<{ _id: string }>(eventName.LEAVE);

export const sendMessage = createAction<SocketSendMessage>(eventName.CHAT);
