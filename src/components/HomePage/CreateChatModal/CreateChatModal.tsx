import React, { useState } from "react";
import Modal from "react-modal";
import "./CreateChatModal.css";
import { ChatForm } from "./ChatForm";

type PropsType = {
  isOpen: boolean;
  closeModal: () => void;
};

export const CreateChatModal = ({ isOpen, closeModal }: PropsType) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="chatModal"
        overlayClassName="chatModal-overlay"
      >
        <h2>채팅방 생성</h2>
        <ChatForm closeModal={closeModal} />
      </Modal>
    </>
  );
};
