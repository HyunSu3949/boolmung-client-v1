import React, { useState } from "react";

import { Modal } from "src/components/dom/common/Modal";

import { LoginForm } from "../components/dom/LoginPage/LoginForm/LoginForm";
import { SignupForm } from "../components/dom/LoginPage/SignupForm/SignupForm";
import Alert from "../components/dom/LoginPage/Alert";

export default function LoginPage() {
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
    <div className="m-auto flex w-full items-center justify-center">
      <div className="m-auto flex w-fit flex-col items-center justify-center">
        <LoginForm />
        <button
          className="mt-2 w-full rounded-md bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
