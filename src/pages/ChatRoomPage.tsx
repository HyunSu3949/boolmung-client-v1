import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "src/redux/store";
import { disconnect, setError } from "src/redux/features/socketSlice";
import { Modal } from "src/components/dom/common/Modal";
import { ChatWindow } from "src/components/dom/ChatRoomPage/ChatWinow";
import { connect, leave } from "src/redux/features/socketActions";

import Header from "../components/dom/ChatRoomPage/Header";

export default function ChatRoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomid } = useParams();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const errorMassage = useSelector(
    (state: RootState) => state.reducer.socketReducer.errorMassage,
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
    <main className="static flex w-full flex-1 flex-col bg-slate-900">
      <div className="h-15 flex items-center space-x-4 p-4">
        <Header />
      </div>
      <div className="flex w-full flex-1">
        <ChatWindow />
      </div>
    </main>
    // {errorMassage && (
    //   <Modal isOpen closeModal={closeModal}>
    //     <div className="flex flex-col items-center justify-center p-8">
    //       <p className="mb-4 text-slate-200">{errorMassage}</p>
    //       <button
    //         onClick={closeModal}
    //         type="button"
    //         className="p-2 rounded-md bg-slate-500 text-slate-200"
    //       >
    //         나가기
    //       </button>
    //     </div>
    //   </Modal>
    // )}
  );
}
