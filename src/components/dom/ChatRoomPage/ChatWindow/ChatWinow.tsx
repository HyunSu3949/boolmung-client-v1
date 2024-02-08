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
    <div className="text-slate-900">
      <div className="">
        <ChatList />
      </div>
      <form onSubmit={onSubmit} className="">
        <input
          ref={inputRef}
          onKeyDown={onInputKeyDown}
          onKeyUp={onInputKeyUp}
          onChange={onChange}
          type="text"
          value={message}
          className=""
        />
        <button className="" type="submit">
          입력
        </button>
      </form>
    </div>
  );
}
