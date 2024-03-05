import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { sendMessage } from "src/redux/features/socketActions";
import { Svgs } from "src/components/dom/common/Svgs";

type Props = {
  userId: string;
  userName: string;
  roomId: string;
};

export default function MessageInput({ userId, userName, roomId }: Props) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (message: string) => {
    dispatch(
      sendMessage({
        message,
        _id: userId,
        name: userName,
        roomId,
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

  return (
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
  );
}
