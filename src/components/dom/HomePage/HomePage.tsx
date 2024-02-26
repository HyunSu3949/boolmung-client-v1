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
    <main className="flex flex-col flex-1 w-full">
      <div className="w-full px-2 py-6">
        <button
          className="flex items-center p-3 font-semibold rounded bg-slate-500 text-slate-100 hover:bg-slate-400"
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
      <div className="max-h-[80vh] w-full flex-1 overflow-y-auto bg-gray-800 p-4">
        <RoomList />
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ChatForm />
      </Modal>
    </main>
  );
}
