import { useSelector } from "react-redux";

import Message from "src/components/Chat/Message";
import MessageInput from "src/components/Chat/MessageInput";
import { VirtualScroll } from "src/components/common/VirtualScroll";
import { RootState } from "src/redux/store";

export function ChatWindow() {
  const messageList = useSelector(
    (state: RootState) => state.reducer.socketReducer.messageList,
  );

  return (
    <div className="flex w-full flex-1 flex-col bg-gray-900 p-2 text-white">
      <div className="flex h-full w-full overflow-auto rounded-lg border border-gray-700 bg-gray-800">
        <VirtualScroll list={messageList} ItemComponent={Message} />
      </div>
      <div className="h-15">
        <MessageInput />
      </div>
    </div>
  );
}
