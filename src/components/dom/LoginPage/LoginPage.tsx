import React, { useState } from "react";

import { Modal } from "src/components/dom/common/Modal";

import { LoginForm } from "./LoginForm/LoginForm";
import { SignupForm } from "./SignupForm/SignupForm";
import Alert from "./Alert";

export function LoginPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openConfirmModal = () => {
    setConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="flex items-center justify-center w-full m-auto">
      <div className="flex flex-col items-center justify-center m-auto w-fit">
        <LoginForm />
        <button
          className="w-full px-6 py-2 mt-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={openModal}
          type="button"
        >
          회원가입
        </button>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <SignupForm
            closeModal={closeModal}
            openConfirmModal={openConfirmModal}
          />
        </Modal>
        <Modal isOpen={confirmOpen} closeModal={closeConfirmModal}>
          <div className="p-4 py-8 text-slate-200">회원 가입 완료!</div>
        </Modal>
        <Alert />
      </div>
    </div>
  );
}
