import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ChatList } from "src/components/dom/ChatRoomPage/ChatList";
import { RootState } from "src/redux/store";
import MessageInput from "src/components/dom/ChatRoomPage/MessageInput";

export function ChatWindow() {
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomid } = useParams();

  return (
    <div
      ref={chatWindowRef}
      className="flex w-full flex-1 flex-col bg-gray-900 p-2 text-white"
    >
      <div className="flex w-full flex-1 overflow-auto rounded-lg border border-gray-700 bg-gray-800">
        <ChatList />
      </div>
      <MessageInput
        userId={user._id}
        userName={user.name}
        roomId={roomid as string}
      />
    </div>
  );
}
