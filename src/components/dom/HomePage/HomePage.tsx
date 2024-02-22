import { useState } from "react";

import { Modal } from "src/components/dom/common/Modal";
import { ChatForm } from "src/components/dom/HomePage/ChatForm";

import { RoomList } from "./RoomList";

export function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex-col py-6">
      <button
        className="mb-6 ml-2 rounded bg-slate-400 p-3 font-semibold"
        onClick={openModal}
        type="button"
      >
        채팅방 개설
      </button>
      <RoomList />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ChatForm />
      </Modal>
    </div>
  );
}
