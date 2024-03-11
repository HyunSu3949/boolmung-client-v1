import { useState } from "react";

import { Modal } from "src/components/common/Modal";
import { ChatForm } from "src/components/HomePage/ChatForm";
import { Svgs } from "src/components/common/Svgs";

import { RoomList } from "../components/HomePage/RoomList";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex flex-col w-full min-h-screen">
      <div className="w-full px-2 py-6">
        <button
          className="flex items-center p-3 font-semibold rounded bg-slate-500 text-slate-100 hover:bg-slate-400"
          onClick={openModal}
          type="button"
        >
          <Svgs id="plus" size="1.25rem" title="플러스 아이콘" />
          방만들기
        </button>
      </div>
      <div className="flex flex-col flex-1 w-full p-2 overflow-y-auto bg-gray-800">
        <RoomList />
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ChatForm />
      </Modal>
    </main>
  );
}
