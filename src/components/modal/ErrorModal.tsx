import { useNavigate } from "react-router-dom";

import Modal from "src/components/modal/Modal";

type Props = {
  message?: string;
  onCloseModal: () => void;
};

export default function ErrorModal({ message, onCloseModal }: Props) {
  const navigate = useNavigate();
  const closeAndMoveToHome = () => {
    onCloseModal();
    navigate("/");
  };

  return (
    <Modal onCloseModal={closeAndMoveToHome}>
      <div className="px-8 py-4">
        <p className="text-slate-200">{message}</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={closeAndMoveToHome}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            type="button"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
