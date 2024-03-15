import { useSelector } from "react-redux";

import Message from "src/components/ChatRoomPage/Message";
import MessageInput from "src/components/ChatRoomPage/MessageInput";
import { VirtualScroll } from "src/components/common/VirtualScroll";
import { RootState } from "src/redux/store";

export function ChatWindow() {
  const messageList = useSelector(
    (state: RootState) => state.reducer.socketReducer.messageList,
  );

  return (
    <div className="flex flex-col flex-1 w-full p-2 text-white bg-gray-900">
      <div className="flex w-full h-full overflow-auto bg-gray-800 border border-gray-700 rounded-lg">
        <VirtualScroll list={messageList} ItemComponent={Message} />
      </div>
      <div className="h-15">
        <MessageInput />
      </div>
    </div>
  );
}
