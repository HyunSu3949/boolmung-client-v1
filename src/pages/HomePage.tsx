import { useState } from "react";

import { RoomList } from "../components/HomePage/RoomList";
import CreateChatButton from "../components/HomePage/CreateChatButton";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <main className="flex flex-col w-full min-h-screen">
      <div className="w-full px-2 py-6">
        <CreateChatButton />
      </div>
      <div className="flex flex-col flex-1 w-full p-2 overflow-y-auto bg-gray-800">
        <RoomList />
      </div>
    </main>
  );
}
