import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  connectSocket,
  disconnectSocket,
} from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";

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
      connectSocket({
        _id: user._id,
        roomId: roomid as string,
        name: user.name,
      }),
    );

    return () => {
      dispatch(
        disconnectSocket({
          _id: user._id,
          roomId: roomid as string,
          name: user.name,
        }),
      );
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
