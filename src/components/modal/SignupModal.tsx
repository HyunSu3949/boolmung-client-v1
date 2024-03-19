import Modal from "src/components/modal/Modal";

import { SignupForm } from "../form/SignupForm/SignupForm";

type Props = {
  onCloseModal: () => void;
};

export default function SignupModal({ onCloseModal }: Props) {
  return (
    <Modal onCloseModal={onCloseModal}>
      <SignupForm closeModal={onCloseModal} />
    </Modal>
  );
}
