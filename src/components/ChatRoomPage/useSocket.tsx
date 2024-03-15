import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Manager, Socket, io } from "socket.io-client";

import {
  deleteInfo,
  getRoomInfo,
  join,
  move,
  setError,
  setMessageList,
  setMyPosition,
} from "src/redux/features/socketSlice";
import { RootState } from "src/redux/store";

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

export default function useSocket() {
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useDispatch();
  const { roomid } = useParams();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { myInfo } = useSelector(
    (state: RootState) => state.reducer.socketReducer,
  );

  useEffect(() => {
    // Socket 연결
    const manager = new Manager(URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });
    const socketInstance = manager.socket(ROOM);

    setSocket(socketInstance);

    // 이벤트 핸들러 등록
    const setupEventListeners = (socket: Socket) => {
      socket.on(eventName.CHAT, (data) => {
        dispatch(setMessageList(data));
      });

      socket.on(eventName.MOVE, (data) => {
        if (user._id !== data._id) {
          dispatch(move(data));
        }
      });
      socket.on(eventName.JOIN, (data) => {
        dispatch(join(data));
        socket.emit(eventName.MOVE, myInfo);
        dispatch(move(myInfo));
      });

      socket.on(eventName.LEAVE, (data) => {
        dispatch(deleteInfo(data));
      });

      socket.on(eventName.GET_ROOM_INFO, (data) => {
        dispatch(getRoomInfo(data));
      });

      socket.on(eventName.NOTFOUND, (data) => {
        const { message } = data;
        dispatch(setError({ errorState: true, message }));
      });

      socket.on(eventName.FULL, (data) => {
        const { message } = data;
        dispatch(setError({ errorState: true, message }));
      });

      // 참여 메세지 전송
      socket.emit(eventName.JOIN, {
        type: "system",
        roomId: roomid,
        ...user,
      });
    };

    if (socketInstance) setupEventListeners(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [dispatch, myInfo, roomid, user]);
}
