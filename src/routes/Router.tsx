import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../components/HomePage/HomePage";
import { ChatRoomPage } from "../components/ChatRoomPage/ChatRoomPage";
import { LoginPage } from "../components/LoginPage/LoginPage";
import { useAuth } from "../components/common/Context/AuthContext";
import NoMatch from "./Nomatch";

export const Router = () => {
  const { isLogedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {isLogedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:id" element={<ChatRoomPage />} />
            <Route path="*" element={<NoMatch />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<NoMatch />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
