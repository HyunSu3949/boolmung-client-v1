import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";
import { SocketReceiveMessage } from "src/types/index";

export function ChatList() {
  const messageListRef = useRef<HTMLUListElement>(null);
  const { messageList } = useSelector(
    (state: RootState) => state.reducer.socketReducer,
  );

  useEffect(() => {
    messageListRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageList]);

  return (
    <div
      className="overflow-auto rounded-lg bg-gray-800 p-4"
      style={{ maxHeight: "80vh" }}
    >
      <ul ref={messageListRef} className="space-y-2">
        {messageList.map((message: SocketReceiveMessage) => (
          <li
            key={message._id}
            className={`rounded-lg p-2 ${
              message.type === "mine"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            <span className="font-bold">{message.name}</span>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
