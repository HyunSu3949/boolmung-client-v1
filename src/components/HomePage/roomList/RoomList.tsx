import React, { useState } from "react";
import { CreateChatModal } from "../CreateChatModal/CreateChatModal";
import { useRoomSocket } from "../useRoomSocket";
import "./RoomList.css";
type RoomInfo = {
  _id: string;
  owner: string;
  title: string;
  max: number;
  participants: string[];
};
export const RoomList: React.FC = () => {
  const { roomList, enterRoom } = useRoomSocket();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="roomListBox">
        <ul className="roomUl">
          {roomList.map((room: RoomInfo) => (
            <li
              className="roomLi"
              key={room._id}
              onClick={() => enterRoom(room._id)}
            >
              <h2 className="roomTitle">{room.title}</h2>
              <p className="roomInfo">
                {room.participants.length}/{room.max}
              </p>
            </li>
          ))}
        </ul>
        <button className="makeRoomButton" onClick={openModal}>
          채팅방 개설
        </button>
        <CreateChatModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  );
};
