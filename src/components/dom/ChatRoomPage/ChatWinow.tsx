import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ChatList } from "src/components/dom/ChatRoomPage/ChatList";
import { sendMessage } from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";

export function ChatWindow() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomid } = useParams();

  const handleSendMessage = (message: string) => {
    dispatch(
      sendMessage({
        message,
        _id: user._id,
        name: user.name,
        roomId: roomid as string,
      }),
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;

    handleSendMessage(message.trim());
    setMessage("");
  };

  useEffect(() => {
    const chatPageElement = chatWindowRef.current;
    const onInputKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
    };

    const onInputKeyUp = (e: KeyboardEvent) => {
      e.stopPropagation();
    };

    chatPageElement?.addEventListener("keydown", onInputKeyDown);
    chatPageElement?.addEventListener("keyup", onInputKeyUp);

    return () => {
      chatPageElement?.removeEventListener("keydown", onInputKeyDown);
      chatPageElement?.removeEventListener("keyup", onInputKeyUp);
    };
  }, []);

  return (
    <div
      ref={chatWindowRef}
      className="flex flex-col flex-1 w-full p-2 text-white bg-gray-900"
    >
      <div className="flex flex-1 w-full overflow-auto bg-gray-800 border border-gray-700 rounded-lg">
        <ChatList />
      </div>
      <form onSubmit={onSubmit} className="flex py-2 space-x-2">
        <input
          ref={inputRef}
          onChange={onChange}
          type="text"
          value={message}
          className="flex-1 p-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="메시지 입력..."
        />
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
          type="submit"
        >
          <img src="/img/up-arrow.svg" alt="전송 버튼" className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
