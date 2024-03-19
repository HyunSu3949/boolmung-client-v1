import { RoomList } from "../components/Home/RoomList";
import CreateChatButton from "../components/form/CreateChatForm/CreateChatButton";

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="w-full px-2 py-6">
        <CreateChatButton />
      </div>
      <div className="flex w-full flex-1 flex-col overflow-y-auto bg-gray-800 p-2">
        <RoomList />
      </div>
    </main>
  );
}
