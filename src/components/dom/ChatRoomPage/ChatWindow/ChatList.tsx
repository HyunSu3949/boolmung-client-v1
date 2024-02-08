import React, { useEffect, useRef } from "react";

import { Chat } from "src/types/index";

export function ChatList() {
  const chatListRef = useRef<HTMLUListElement>(null);

  console.log();

  useEffect(() => {
    chatListRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      {/* <ul ref={chatListRef}>
        {chatList.map((chat) => (
          <li key={chat._id} className={chat.type === "mine" ? "mine" : "others"}>
            <span>{chat.name}</span>
            <p>{chat.message}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
