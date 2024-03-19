import ClientErrorBoundary from "src/components/Error/ClientErrorBoundary";
import ServerErrorBoundary from "src/components/Error/ServerErrorBoundary";

import { RoomList } from "../components/room/RoomList";
import CreateChatButton from "../components/form/CreateChatForm/CreateChatButton";

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="w-full px-2 py-6">
        <CreateChatButton />
      </div>
      <div className="flex w-full flex-1 flex-col overflow-y-auto bg-gray-800 p-2">
        <h2 className="my-4 text-slate-300">채팅방 목록</h2>
        <ServerErrorBoundary>
          <ClientErrorBoundary>
            <RoomList />
          </ClientErrorBoundary>
        </ServerErrorBoundary>
      </div>
    </main>
  );
}
