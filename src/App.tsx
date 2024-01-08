import React from "react";
import { AuthProvider } from "./components/common/Context/AuthContext";
import { Router } from "./routes/Router";
import { SoundButton } from "./components/common/SoundButton/SoundButton";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <SoundButton />
    </>
  );
}
