import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "src/redux/store";
import { connect, disconnect } from "src/redux/features/socketSlice";

import { ChatWindow } from "./ChatWinow";

export function ChatRoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomid } = useParams();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomInfo } = useSelector(
    (state: RootState) => state.reducer.socketReducer,
  );
  console.log(roomInfo);

  const exitRoom = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(
      connect({
        _id: user._id,
        roomId: roomid as string,
        name: user.name,
        image: user.image,
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
  }, [dispatch, roomid, user]);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-800">
      <div className="flex items-center space-x-2 p-2">
        <button
          onClick={exitRoom}
          className="flex items-center rounded bg-slate-600 px-4 py-2 text-white hover:bg-slate-400 focus:outline-none"
          type="button"
        >
          <img
            src="/img/exit.svg"
            className="mr-2 h-5 w-5 text-white"
            alt="나가기 아이콘"
          />
          나가기
        </button>
        <p className="text-xl text-white">{roomInfo.title}</p>
      </div>
      <ChatWindow />
    </div>
  );
}
