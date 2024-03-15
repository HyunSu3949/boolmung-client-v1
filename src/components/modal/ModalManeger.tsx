import { ComponentType } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfirmModal from "src/components/modal/ConfirmModal";
import CreateChatModal from "src/components/modal/CreateChatModal";
import ErrorModal from "src/components/modal/ErrorModal";
import ExitModal from "src/components/modal/ExitModal";
import SignupModal from "src/components/modal/SignupModal";
import { closeModal } from "src/redux/features/modalSlice";
import { RootState } from "src/redux/store";
import { BaseModalType, ModalId } from "src/types/index";

const ModalIdMap: Record<ModalId, ComponentType<BaseModalType>> = {
  confirmModal: ConfirmModal,
  signupModal: SignupModal,
  errorModal: ErrorModal,
  createChatModal: CreateChatModal,
  exitModal: ExitModal,
};

export default function ModalManeger() {
  const { openedModals } = useSelector(
    (state: RootState) => state.reducer.modalReducer,
  );
  const dispatch = useDispatch();

  return (
    <div>
      {openedModals.map((modal, idx) => {
        const { componentId, props } = modal;
        const ModalComponent = ModalIdMap[componentId];

        const onCloseModal = () => {
          dispatch(closeModal(componentId));
        };

        return (
          <ModalComponent key={idx} onCloseModal={onCloseModal} {...props} />
        );
      })}
    </div>
  );
}
