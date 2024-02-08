import React, { useState } from "react";

import { LoginForm } from "./LoginForm/LoginForm";
import { SignupModal } from "./SignupForm/SignupModal";

export function LoginPage() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="side">
      <LoginForm />
      <button className="signupModalButton" onClick={openModal} type="button">
        회원가입
      </button>
      <SignupModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
