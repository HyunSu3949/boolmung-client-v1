import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "src/redux/store";
import { connect, disconnect, setError } from "src/redux/features/socketSlice";
import { Modal } from "src/components/dom/common/Modal";

import { ChatWindow } from "./ChatWinow";

export function ChatRoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomid } = useParams();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomInfo, errorMassage } = useSelector(
    (state: RootState) => state.reducer.socketReducer,
  );

  const exitRoom = () => {
    navigate("/");
  };

  const closeModal = () => {
    dispatch(setError({ errorState: false, message: "" }));
    exitRoom();
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
    <div className="flex h-screen w-full flex-col bg-slate-900">
      <div className="flex items-center space-x-4 p-4">
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
      <div className="flex w-full flex-1">
        <ChatWindow />
      </div>

      {errorMassage && (
        <Modal isOpen closeModal={closeModal}>
          <div>
            <p>{errorMassage}</p>
            <button onClick={closeModal} type="button">
              나가기
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
