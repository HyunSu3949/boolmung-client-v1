import { useState } from "react";

import { Modal } from "src/components/dom/common/Modal";
import { ChatForm } from "src/components/dom/homePage/ChatForm";
import { Svgs } from "src/components/dom/common/Svgs";

import { RoomList } from "./RoomList";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="w-full px-2 py-6">
        <button
          className="flex items-center rounded bg-slate-500 p-3 font-semibold text-slate-100 hover:bg-slate-400"
          onClick={openModal}
          type="button"
        >
          <Svgs id="plus" size="1.25rem" title="플러스 아이콘" />
          방만들기
        </button>
      </div>
      <div className="flex w-full flex-1 flex-col overflow-y-auto bg-gray-800 p-2">
        <RoomList />
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ChatForm />
      </Modal>
    </main>
  );
}
