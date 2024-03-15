import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DomLayout from "src/layouts/NavLayout";
import { Spinner } from "src/components/common/Spinner";
import Layout from "src/layouts/Layout";
import NoMatch from "src/pages/Nomatch";
import ModalManeger from "src/components/modal/ModalManeger";

import RequireAuth from "./RequireAuth";

const LoginPage = lazy(() => import("src/pages/LoginPage"));
const Home = lazy(() => import("src/pages/HomePage"));
const My = lazy(() => import("src/pages/MyPage"));
const Chat = lazy(() => import("src/pages/ChatRoomPage"));

export default function Router() {
  return (
    <BrowserRouter>
      <ModalManeger />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<DomLayout />}>
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
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}
