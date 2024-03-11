import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { MessageList } from "src/components/ChatRoomPage/MessageList";
import MessageInput from "src/components/ChatRoomPage/MessageInput";
import { RootState } from "src/redux/store";

export function ChatWindow() {
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomid } = useParams();

  return (
    <div
      ref={chatWindowRef}
      className="flex w-full flex-1 flex-col bg-gray-900 p-2 text-white"
    >
      <div className="flex h-full w-full overflow-auto rounded-lg border border-gray-700 bg-gray-800">
        <MessageList />
      </div>
      <div className="h-15">
        <MessageInput
          userId={user._id}
          userName={user.name}
          roomId={roomid as string}
        />
      </div>
    </div>
  );
}
