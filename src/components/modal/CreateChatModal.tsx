import { ChatForm } from "src/components/HomePage/ChatForm";
import Modal from "src/components/modal/Modal";

type Props = {
  onCloseModal: () => void;
};
export default function CreateChatModal({ onCloseModal }: Props) {
  return (
    <Modal onCloseModal={onCloseModal}>
      <ChatForm onCloseModal={onCloseModal} />
    </Modal>
  );
}
