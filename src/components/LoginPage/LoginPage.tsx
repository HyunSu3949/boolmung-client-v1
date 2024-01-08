import React, { useState } from "react";
import LogoutScene from "../canvas/LogoutScene";
import { LoginForm } from "../LoginPage/LoginForm/LoginForm";
import { SignupModal } from "../LoginPage/SignupForm/SignupModal";

export const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <LogoutScene />
      <div className="side">
        <LoginForm />
        <button className="signupModalButton" onClick={openModal}>
          회원가입
        </button>
        <SignupModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  );
};
