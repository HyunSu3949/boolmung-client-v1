import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { sendMessage } from "src/redux/features/socketActions";
import { Svgs } from "src/components/common/Svgs";
import { RootState } from "src/redux/store";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomid } = useParams();

  const handleSendMessage = (message: string) => {
    dispatch(
      sendMessage({
        message,
        _id: user._id,
        name: user.image,
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

  return (
    <form onSubmit={onSubmit} className="flex py-2 space-x-2 h-15">
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
        <Svgs id="up-arrow" size="1.25rem" title="전송버튼" />
      </button>
    </form>
  );
}
