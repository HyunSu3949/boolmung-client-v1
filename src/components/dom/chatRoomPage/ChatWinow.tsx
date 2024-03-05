import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ChatList } from "src/components/dom/ChatRoomPage/ChatList";
import { sendMessage } from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";
import { Svgs } from "src/components/dom/common/Svgs";

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
      className="flex w-full flex-1 flex-col bg-gray-900 p-2 text-white"
    >
      <div className="flex w-full flex-1 overflow-auto rounded-lg border border-gray-700 bg-gray-800">
        <ChatList />
      </div>
      <form onSubmit={onSubmit} className="flex space-x-2 py-2">
        <input
          ref={inputRef}
          onChange={onChange}
          type="text"
          value={message}
          className="flex-1 rounded-lg border border-gray-700 bg-gray-800 p-2 text-white focus:border-blue-500 focus:outline-none"
          placeholder="메시지 입력..."
        />
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          <Svgs id="up-arrow" size="1.25rem" title="전송버튼" />
        </button>
      </form>
    </div>
  );
}
