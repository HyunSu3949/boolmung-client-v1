import React, { useEffect, useRef, useState } from "react";
import { io, Socket, Manager } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

const Url = (
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://boolmung-api-v1-hs.koyeb.app"
) as string;
const Path = "/socket.io";

type Chat = {
  _id: string;
  type: "system" | "mine" | "others" | undefined;
  name: string;
  message: string;
};

export const useChatSocket = () => {
  const chatSocketRef = useRef<Socket>();
  const [actionInfo, setActionInfo] = useState({});
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { id } = useParams();

  const connectChat = () => {
    const manager = new Manager(Url);
    const chatSokcet = manager.socket("/chat");
    chatSokcet.emit("join", {
      userId: user.userId,
      roomId: id,
      name: user.name,
    });

    return chatSokcet;
  };

  const sendChat = (message: string) => {
    if (chatSocketRef.current) {
      chatSocketRef.current.emit("chat", {
        userId: user.userId,
        roomId: id,
        name: user.name,
        message,
      });
    }
  };
  const joinCallback = (data: any) => {};

  const chatCallback = (data: Chat) => {
    if (data._id === user._id) {
      data.type = "mine";
    } else if (data._id !== user._id) {
      data.type = "others";
    }

    setChatList((prev) => [...prev, data]);
  };

  const moveCallback = (data: any) => {
    setActionInfo(data);
  };

  const disconnectChat = (socket: any) => {
    socket.on("disconnect", () => {});
  };

  const addSocketEvent = (socket: any) => {
    socket.on("join", joinCallback);
    socket.on("chat", chatCallback);
    socket.on("move", moveCallback);
  };

  const removeSocketEvent = (socket: any) => {
    socket.off("join", joinCallback);
    socket.off("chat", chatCallback);
    socket.off("move", moveCallback);
  };

  useEffect(() => {
    chatSocketRef.current = connectChat();

    return () => {
      if (chatSocketRef.current) {
        disconnectChat(chatSocketRef.current);
        removeSocketEvent(chatSocketRef.current);
      }
    };
  }, []);

  return {
    chatSocketRef,
    chatList,
    actionInfo,
    sendChat,
  };
};
