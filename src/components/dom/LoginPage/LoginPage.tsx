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
    <div className="flex w-full items-center justify-center">
      <div className="m-auto flex w-fit flex-col items-center justify-center">
        <LoginForm />
        <button
          className="mt-2 w-full rounded-md bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={openModal}
          type="button"
        >
          회원가입
        </button>
        <SignupModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </div>
  );
}
