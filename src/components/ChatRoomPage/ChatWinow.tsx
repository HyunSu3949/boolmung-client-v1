import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Message from "src/components/ChatRoomPage/Message";
import MessageInput from "src/components/ChatRoomPage/MessageInput";
import { VirtualScroll } from "src/components/common/VirtualScroll";
import { RootState } from "src/redux/store";

export function ChatWindow() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const messageList = useSelector(
    (state: RootState) => state.reducer.socketReducer.messageList,
  );
  const { roomid } = useParams();

  return (
    <div className="flex w-full flex-1 flex-col bg-gray-900 p-2 text-white">
      <div className="flex h-full w-full overflow-auto rounded-lg border border-gray-700 bg-gray-800">
        <VirtualScroll list={messageList} ItemComponent={Message} />
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
