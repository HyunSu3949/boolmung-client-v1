import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { MessageList } from "src/components/dom/ChatRoomPage/MessageList";
import { RootState } from "src/redux/store";
import MessageInput from "src/components/dom/ChatRoomPage/MessageInput";

export function ChatWindow() {
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomid } = useParams();

  return (
    <div
      ref={chatWindowRef}
      className="flex flex-col flex-1 w-full p-2 text-white bg-gray-900"
    >
      <div className="flex w-full h-full overflow-auto bg-gray-800 border border-gray-700 rounded-lg">
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
