import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "src/redux/store";
import {
  connect,
  disconnect,
  leave,
  setError,
} from "src/redux/features/socketSlice";
import { Modal } from "src/components/dom/common/Modal";

import { ChatWindow } from "./ChatWinow";
import { SoundButton } from "../common/SoundButton/SoundButton";

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
      dispatch(leave({ _id: user._id }));
      if (localStorage.getItem("isReloading") !== "true") {
        dispatch(disconnect());
      }
    };
  }, [dispatch, roomid, user]);

  return (
    <main className="static flex flex-col flex-1 w-full bg-slate-900">
      <div className="flex min-h-[10vh] items-center space-x-4 p-4">
        <div className="absolute p-4 rounded-md left-3 bg-slate-600">
          <SoundButton />
        </div>
        <button
          onClick={exitRoom}
          className="flex items-center px-4 py-2 text-white rounded bg-slate-600 hover:bg-slate-400 focus:outline-none"
          type="button"
        >
          <img
            src="/img/exit.svg"
            className="w-5 h-5 mr-2 text-white"
            alt="나가기 아이콘"
          />
          나가기
        </button>
        <p className="text-xl text-white">{roomInfo.title}</p>
      </div>
      <div className="flex max-h-[90vh] w-full flex-1">
        <ChatWindow />
      </div>

      {errorMassage && (
        <Modal isOpen closeModal={closeModal}>
          <div className="flex flex-col items-center justify-center p-8">
            <p className="mb-4 text-slate-200">{errorMassage}</p>
            <button
              onClick={closeModal}
              type="button"
              className="p-2 rounded-md bg-slate-500 text-slate-200"
            >
              나가기
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}
