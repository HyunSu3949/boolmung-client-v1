import React, { useRef, useState } from "react";
import { ChatList } from "./ChatList";
import "./ChatWindow.css";

export const ChatWindow = ({ chatList, sendChat }: any) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;

    sendChat(message);
    setMessage("");
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="chatWindow">
      <div className="chatListBox">
        <ChatList chatList={chatList} />
      </div>
      <form onSubmit={onSubmit} className="chatForm">
        <input
          ref={inputRef}
          onKeyDown={onInputKeyDown}
          onKeyUp={onInputKeyUp}
          onChange={onChange}
          type="text"
          value={message}
          className="chatInput"
        />
        <button className="chatButton" type="submit">
          입력
        </button>
      </form>
    </div>
  );
};
