import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "src/redux/store";
import { connect, disconnect, leave } from "src/redux/features/socketSlice";

import { ChatWindow } from "./ChatWindow/ChatWinow";

export function ChatRoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomid } = useParams();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const exitRoom = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(
      connect({
        _id: user._id,
        roomId: roomid as string,
        name: user.name,
      }),
    );
    const handleBeforeUnload = () => {
      localStorage.setItem("isReloading", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (localStorage.getItem("isReloading") === "true") {
      localStorage.removeItem("isReloading");
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (localStorage.getItem("isReloading") !== "true") {
        dispatch(disconnect());
      }
    };
  }, [dispatch, roomid, user._id, user.name]);

  return (
    <div className="side">
      <ChatWindow />
      <button className="exitButton" onClick={exitRoom} type="button">
        나가기
      </button>
    </div>
  );
}
