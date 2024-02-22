import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { HomePage } from "src/components/dom/HomePage/HomePage";
import { ChatRoomPage } from "src/components/dom/ChatRoomPage/ChatRoomPage";
import { LoginPage } from "src/components/dom/LoginPage/LoginPage";
import NoMatch from "src/components/dom/noMatchPage/Nomatch";
import Layout from "src/components/dom/Layout";
import MyPage from "src/components/dom/myPage/MyPage";
import NewfacePage from "src/components/dom/newfacePage/NewfacePage";
import { RootState } from "src/redux/store";

export default function DomContainer() {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.reducer.authReducer,
  );

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/newface" element={<NewfacePage />} />
          </Route>
          <Route path="/room/:roomid" element={<ChatRoomPage />} />
          <Route path="*" element={<NoMatch />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NoMatch />} />
        </>
      )}
    </Routes>
  );
}
