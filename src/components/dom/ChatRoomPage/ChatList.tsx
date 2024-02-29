import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";
import { SocketReceiveMessage } from "src/types/index";

export function ChatList() {
  const messageListRef = useRef<HTMLUListElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { messageList } = useSelector(
    (state: RootState) => state.reducer.socketReducer,
  );
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  useEffect(() => {
    const scrollHeight = messageListRef.current?.scrollHeight;
    const divHeight = divRef.current?.clientHeight;

    if (scrollHeight && divHeight && scrollHeight > divHeight) {
      messageListRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messageList]);

  return (
    <div ref={divRef} className="w-full p-4 bg-gray-800 rounded-lg ">
      <ul ref={messageListRef} className="space-y-2">
        {messageList.map((message: SocketReceiveMessage, idx: number) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={`rounded-lg p-2 ${
              message.type === "user"
                ? `${
                    user._id === message._id ? "bg-blue-500" : " bg-slate-400"
                  } text-white`
                : "bg-slate-700 text-center text-gray-300"
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
