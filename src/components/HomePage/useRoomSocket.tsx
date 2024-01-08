import { useEffect, useState } from "react";
import { getAllRoom } from "../../apis/room/getAllRoom";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../apis/room/joinRoom";

import { io, Socket } from "socket.io-client";

const Url = "http://localhost:3000/room";
const Path = "/socket.io";

type RoomInfo = {
  _id: string;
  owner: string;
  title: string;
  max: number;
  participants: string[];
};
export const useRoomSocket = () => {
  const [roomSocket, setRoomSocket] = useState<Socket>();
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
    const roomSocket = io(Url, {
      path: Path,
    });
    setRoomSocket(roomSocket);
  };

  const disconnectChat = () => {
    roomSocket?.disconnect();
  };

  const addSocketEvent = () => {
    roomSocket?.on("enter", enterCallback);
    roomSocket?.on("newRoom", newRoomCallback);
    roomSocket?.on("roomDeleted", roomDeletedCallback);
  };

  const removeSocketEvent = () => {
    roomSocket?.off("enter", enterCallback);
  };

  const enterCallback = () => {};
  const newRoomCallback = (data: RoomInfo) => {
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

    if (!roomSocket) connectRoom();

    addSocketEvent();

    return () => {
      disconnectChat();
      removeSocketEvent();
    };
  }, [roomSocket]);

  return { roomList, enterRoom };
};
