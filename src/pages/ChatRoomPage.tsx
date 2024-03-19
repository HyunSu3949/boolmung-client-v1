import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "src/redux/store";
import { disconnect } from "src/redux/features/socketSlice";
import { ChatWindow } from "src/components/Chat/ChatWinow";
import { connect, leave } from "src/redux/features/socketActions";

import Header from "../components/Chat/Header";

export default function ChatRoomPage() {
  const dispatch = useDispatch();
  const { roomid } = useParams();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  useEffect(() => {
    dispatch(
      connect({
        _id: user._id,
        roomId: roomid as string,
        name: user.name,
        image: user.image,
      }),
    );

    return () => {
      dispatch(leave({ _id: user._id }));
      dispatch(disconnect());
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
  );
}
