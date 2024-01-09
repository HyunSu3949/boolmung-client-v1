import React, { useEffect, useRef, useState } from "react";
import { io, Socket, Manager } from "socket.io-client";
import { useAuth } from "../common/Context/AuthContext";
import { useParams } from "react-router-dom";

const Url = (
  process.env.NODE_ENV == "development"
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
  const { currentUser } = useAuth();
  const { id } = useParams();

  const connectChat = () => {
    const manager = new Manager(Url);
    const chatSokcet = manager.socket("/chat");
    chatSokcet.emit("join", {
      userId: currentUser._id,
      roomId: id,
      name: currentUser.name,
    });

    addSocketEvent(chatSokcet);
    return chatSokcet;
  };

  const sendChat = (message: string) => {
    if (chatSocketRef.current) {
      chatSocketRef.current.emit("chat", {
        userId: currentUser._id,
        roomId: id,
        name: currentUser.name,
        message,
      });
    }
  };
  const joinCallback = (data: any) => {};

  const chatCallback = (data: Chat) => {
    if (data._id === currentUser._id) {
      data.type = "mine";
    } else if (data._id !== currentUser._id) {
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
