import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ChatList } from "src/components/dom/ChatRoomPage/ChatWindow/ChatList";
import { sendMessage } from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";

export function ChatWindow() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
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
    if (message === "") return;

    handleSendMessage(message);
    setMessage("");
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="rounded-lg bg-gray-900 p-4 text-white">
      <div className="mb-4">
        <ChatList />
      </div>
      <form onSubmit={onSubmit} className="flex space-x-2">
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
          전송
        </button>
      </form>
    </div>
  );
}
