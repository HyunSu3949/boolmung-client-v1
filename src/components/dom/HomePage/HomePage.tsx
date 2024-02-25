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
    <div className="flex flex-col w-full min-h-screen py-6">
      <div className="w-full">
        <button
          className="flex items-center p-3 mb-6 ml-2 font-semibold rounded bg-slate-500 text-slate-100 hover:bg-slate-400"
          onClick={openModal}
          type="button"
        >
          <img
            src="/img/plus.svg"
            alt="플러스 이미지"
            className="w-5 h-5 mr-1"
          />
          방만들기
        </button>
      </div>
      <div className="flex w-full bg-gray-800">
        <RoomList />
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ChatForm />
      </Modal>
    </div>
  );
}
