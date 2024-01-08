import React, { useEffect, useRef } from "react";

type Chat = {
  _id: string;
  type: "system" | "mine" | "others" | undefined;
  name: string;
  message: string;
};

export const ChatList = ({ chatList }: { chatList: Chat[] }) => {
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    chatListRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatList]);

  return (
    <div>
      <ul ref={chatListRef}>
        {chatList.map((chat, idx) => (
          <li key={idx} className={chat.type === "mine" ? "mine" : "others"}>
            <span>{chat.name}</span>
            <p>{chat.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
