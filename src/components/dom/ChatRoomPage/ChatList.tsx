import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";
import { SocketReceiveMessage } from "src/types/index";

export function ChatList() {
  const messageListRef = useRef<HTMLUListElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const messageList = useSelector(
    (state: RootState) => state.reducer.socketReducer.messageList,
  );
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  useEffect(() => {
    const scrollHeight = messageListRef.current?.scrollHeight;
    const divHeight = divRef.current?.clientHeight;

    if (scrollHeight && divHeight && scrollHeight > divHeight) {
      messageListRef.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messageList]);

  const getMessageStyle = useCallback(
    (type: string, _id: string) => {
      if (type === "system") return "bg-slate-700 text-center text-gray-300";
      if (_id === user._id) return "bg-blue-500";
      return "bg-slate-400";
    },
    [user._id],
  );

  return (
    <div ref={divRef} className="w-full rounded-lg bg-gray-800 p-4 ">
      <ul ref={messageListRef} className="space-y-2">
        {messageList.map((message: SocketReceiveMessage, idx: number) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={`rounded-lg p-2 ${getMessageStyle(
              message.type,
              message._id,
            )}`}
          >
            <span className="font-bold">{message.name}</span>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
