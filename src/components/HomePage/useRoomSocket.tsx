import { useEffect, useRef, useState } from "react";
import { getAllRoom } from "../../apis/room/getAllRoom";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../apis/room/joinRoom";

import { io, Manager, Socket } from "socket.io-client";

const Url = (
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://boolmung-api-v1-hs.koyeb.app"
) as string;
const Path = "/socket.io";

type RoomInfo = {
  _id: string;
  owner: string;
  title: string;
  max: number;
  participants: string[];
};
export const useRoomSocket = () => {
  const roomSocketRef = useRef<Socket>();
  const [roomList, setRoomList] = useState<RoomInfo[]>([]);

  const navigate = useNavigate();

  const enterRoom = async (roomId: string) => {
    try {
      const result: any = await joinRoom(roomId);
    } catch (err: any) {
      if (err.response.status === 404) {
        alert("허용 인원을 초과했습니다.");
        return;
      }
    }

    navigate(`/room/${roomId}`);
  };

  const connectRoom = () => {
    const manager = new Manager(Url);
    const roomSocket = manager.socket("/room");
    addSocketEvent(roomSocket);
    return roomSocket;
  };

  const disconnectChat = (socket: any) => {
    socket.on("disconnect", () => {});
  };

  const addSocketEvent = (roomSocket: any) => {
    roomSocket.on("enter", enterCallback);
    roomSocket.on("newRoom", newRoomCallback);
    roomSocket.on("roomDeleted", roomDeletedCallback);
  };

  const removeSocketEvent = (socket: any) => {
    socket.off("enter", enterCallback);
  };

  const enterCallback = () => {};
  const newRoomCallback = (data: RoomInfo) => {
    console.log(data);

    setRoomList((prev) => [
      ...prev,
      {
        _id: data._id,
        owner: data.owner,
        title: data.title,
        max: data.max,
        participants: data.participants,
      },
    ]);
  };

  const roomDeletedCallback = (data: string) => {
    console.log(data);

    setRoomList((prev) => [...prev.filter((room) => room._id !== data)]);
  };

  useEffect(() => {
    (async () => {
      const result = await getAllRoom();

      setRoomList(
        result.data.data.data.map((roomInfo: RoomInfo) => ({
          _id: roomInfo._id,
          owner: roomInfo.owner,
          title: roomInfo.title,
          max: roomInfo.max,
          participants: roomInfo.participants,
        }))
      );
    })();
    roomSocketRef.current = connectRoom();

    addSocketEvent(connectRoom());

    return () => {
      if (roomSocketRef.current) {
        disconnectChat(roomSocketRef.current);
        removeSocketEvent(roomSocketRef.current);
      }
    };
  }, []);

  return { roomList, enterRoom };
};
