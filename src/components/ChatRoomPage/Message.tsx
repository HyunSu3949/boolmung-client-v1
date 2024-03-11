import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";
import { SocketReceiveMessage } from "src/types/index";

export default function Message({
  message,
}: {
  message: SocketReceiveMessage;
}) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const getMessageStyle = useCallback(
    (type: string, _id: string) => {
      if (type === "system") return "bg-slate-700 text-center text-gray-300";
      if (_id === user._id) return "bg-blue-500";
      return "bg-slate-400";
    },
    [user._id],
  );

  const getMessageElement = (type: string) => {
    if (type === "system")
      return <p className="text-base">{message.message}</p>;
    return (
      <>
        <span className="block h-8 font-bold">{message.name}</span>
        <p className="text-base">{message.message}</p>
      </>
    );
  };
  return (
    <li
      className={`mb-2 flex list-none	flex-col rounded-lg p-2 ${getMessageStyle(
        message.type,
        message._id,
      )}`}
    >
      {getMessageElement(message.type)}
    </li>
  );
}
