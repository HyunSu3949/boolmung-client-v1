import { useState } from "react";

import { CreateChatModal } from "src/components/dom/HomePage/CreateChatModal/CreateChatModal";

import { RoomList } from "./roomList/RoomList";

export function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex-col p-6">
      <button
        className="mb-6 rounded bg-slate-400 p-3 font-semibold"
        onClick={openModal}
        type="button"
      >
        채팅방 개설
      </button>
      <RoomList />
      <CreateChatModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
