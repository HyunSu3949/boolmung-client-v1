import React, { useState } from "react";
import Modal from "react-modal";
import { SignupForm } from "./SignupForm";
import "./SignupModal.css";

type propsType = {
  isOpen: boolean;
  closeModal: () => void;
};

export const SignupModal = ({ isOpen, closeModal }: propsType) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="signupModal"
        overlayClassName="signupModal-overlay"
      >
        <h2>회원가입</h2>
        <SignupForm closeModal={closeModal} />
      </Modal>
    </>
  );
};
