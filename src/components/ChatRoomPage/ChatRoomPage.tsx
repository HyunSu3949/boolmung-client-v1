import React, { useEffect } from "react";
import { ChatWindow } from "./ChatWindow/ChatWinow";
import { useChatSocket } from "./useChatSocket";
import { ChatScene } from "../canvas/ChatScene";
import "./ChatRoomPage.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../common/Navbar/Navbar";
import { sendChat } from "./../../apis/room/sendChat";

export const ChatRoomPage = () => {
  const { chatList, actionInfo, chatSocketRef, sendChat } = useChatSocket();
  const navigate = useNavigate();
  const exitRoom = () => {
    navigate(-1);
  };
  return (
    <>
      <ChatScene actionInfo={actionInfo} chatSocketRef={chatSocketRef} />
      <Navbar />
      <div className="side">
        <ChatWindow chatList={chatList} sendChat={sendChat} />
        <button className="exitButton" onClick={exitRoom}>
          나가기
        </button>
      </div>
    </>
  );
};
