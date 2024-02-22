import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChatScene } from "src/components/canvas/scene/ChatScene";
import HomeScene from "src/components/canvas/scene/HomeScene";
import { RootState } from "src/redux/store";

export default function CanvasContainer() {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.reducer.authReducer,
  );
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<HomeScene />} />
          <Route path="/room/:roomid" element={<ChatScene />} />
          <Route path="*" element={<HomeScene />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomeScene />} />
          <Route path="*" element={<HomeScene />} />
        </>
      )}
    </Routes>
  );
}
