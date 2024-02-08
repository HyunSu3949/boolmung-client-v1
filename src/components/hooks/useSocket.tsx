import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Manager, Socket } from "socket.io-client";

const URL = (
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SOCKET_DOMAIN
    : process.env.REACT_APP_PROD_SOCKET_DOMAIN
) as string;
const PATH = "/socket.io";

type Props = {
  room: string;
};
export default function useSocket({ room }: Props) {
  const socketRef = useRef<null | Socket>(null);
  const [socketData, setSocketData] = useState(null);
  const [isError, setIsError] = useState(false);
  const { roomid } = useParams();

  useEffect(() => {
    const manager = new Manager(URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    const socket = manager.socket(`/${room}`);

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", (reason) => {
      if (reason !== "io client disconnect") {
        setIsError(true);
      }
    });

    socket.on("reconnect", (attemptNumber) => {
      setIsError(false);
    });

    socket.on("reconnect_failed", () => {});

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendCharacterMovement = (movementData: any) => {
    if (socketRef.current) {
      socketRef.current.emit("character-move", movementData);
    }
  };

  const sendChatMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.emit("chat-message", message);
    }
  };

  return { socketData, isError };
}
