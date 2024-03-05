import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

import { LoginPage } from "src/components/dom/LoginPage/LoginPage";
import NoMatch from "src/components/dom/noMatchPage/Nomatch";
import Layout from "src/components/dom/DomLayout";
import { RootState } from "src/redux/store";
import { Spinner } from "src/components/dom/common/Spinner";

const Home = lazy(() => import("src/components/dom/HomePage/HomePage"));
const My = lazy(() => import("src/components/dom/myPage/MyPage"));
const Chat = lazy(() => import("src/components/dom/ChatRoomPage/ChatRoomPage"));

export default function DomRouter() {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.reducer.authReducer,
  );

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/my"
              element={
                <Suspense fallback={<Spinner />}>
                  <My />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/room/:roomid"
            element={
              <Suspense fallback={<Spinner />}>
                <Chat />
              </Suspense>
            }
          />
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
