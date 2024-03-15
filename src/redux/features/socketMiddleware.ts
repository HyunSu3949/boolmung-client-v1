import { Middleware } from "@reduxjs/toolkit";
import { Manager, Socket } from "socket.io-client";

import ErrorModal from "src/components/modal/ErrorModal";
import { openModal } from "src/redux/features/modalSlice";
import {
  deleteInfo,
  getRoomInfo,
  join,
  move,
  setError,
  setMessageList,
  setMyPosition,
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
  SENDINITIALPOS: "socket/initpos",
  SENDMOVE: "socket/sendMove",
};

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  const { dispatch, getState } = store;
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
          if (getState().reducer.authReducer.user._id !== data._id) {
            dispatch(move(data));
          }
        });

        socket.on(eventName.JOIN, (data: any) => {
          dispatch(join(data));
          socket.emit(eventName.MOVE, getState().reducer.socketReducer.myInfo);
          dispatch(move(getState().reducer.socketReducer.myInfo));
        });

        socket.on(eventName.LEAVE, (data: any) => {
          dispatch(deleteInfo(data));
        });

        socket.on(eventName.GET_ROOM_INFO, (data: any) => {
          dispatch(getRoomInfo(data));
        });

        socket.on(eventName.NOTFOUND, (data: any) => {
          const { message } = data;
          dispatch(setError({ errorState: true, message }));
          dispatch(
            openModal({
              componentId: "errorModal",
              props: { message: "이미 삭제된 방입니다." },
            }),
          );
        });

        socket.on(eventName.FULL, (data: any) => {
          const { message } = data;
          dispatch(setError({ errorState: true, message }));
          dispatch(
            openModal({
              componentId: "errorModal",
              props: { message: "인원이 가득 찼습니다." },
            }),
          );
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

      case eventName.SENDMOVE:
        socket?.emit(eventName.MOVE, action.payload);
        dispatch(setMyPosition(action.payload));
        break;

      case eventName.LEAVE:
        socket.emit(eventName.LEAVE, action.payload);
        break;

      default:
        break;
    }

    return next(action);
  };
};
