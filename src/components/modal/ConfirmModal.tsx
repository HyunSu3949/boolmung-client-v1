import Modal from "src/components/modal/Modal";

type Props = {
  message?: string;
  onCloseModal: () => void;
};

export default function ConfirmModal({ message, onCloseModal }: Props) {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="p-4 py-8 text-slate-200">{message}</div>
    </Modal>
  );
}
