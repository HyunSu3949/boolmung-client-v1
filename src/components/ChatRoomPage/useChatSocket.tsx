import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../common/Context/AuthContext";
import { useParams } from "react-router-dom";

const Url = (
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://boolmung-api-v1-hs.koyeb.app"
) as string;
const Path = "/socket.io";
console.log("chatsocket:", Url);

type Chat = {
  _id: string;
  type: "system" | "mine" | "others" | undefined;
  name: string;
  message: string;
};

export const useChatSocket = () => {
  const [chatSocket, setChatSocket] = useState<Socket>();
  const [actionInfo, setActionInfo] = useState({});
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { currentUser } = useAuth();
  const { id } = useParams();

  const connectChat = () => {
    const chatSocket = io(Url, {
      path: Path,
    });

    chatSocket.emit("join", {
      userId: currentUser._id,
      roomId: id,
      name: currentUser.name,
    });

    addSocketEvent(chatSocket);

    return chatSocket;
  };

  const sendChat = (message: string) => {
    chatSocket?.emit("chat", {
      userId: currentUser._id,
      roomId: id,
      name: currentUser.name,
      message,
    });
  };
  const joinCallback = (data: any) => {
    console.log(data);
  };

  const chatCallback = (data: Chat) => {
    console.log(data);
    console.log(data._id, currentUser._id);

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

  const disconnectChat = () => {
    chatSocket?.disconnect();
  };

  const addSocketEvent = (socket: any) => {
    socket.on("join", joinCallback);
    socket.on("chat", chatCallback);
    socket.on("move", moveCallback);
  };

  const removeSocketEvent = () => {
    chatSocket?.off("join", joinCallback);
    chatSocket?.off("chat", chatCallback);
    chatSocket?.off("move", moveCallback);
  };

  useEffect(() => {
    setChatSocket(connectChat());

    return () => {
      disconnectChat();
      removeSocketEvent();
    };
  }, []);

  return {
    chatSocket,
    chatList,
    actionInfo,
    sendChat,
  };
};
