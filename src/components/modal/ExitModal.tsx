import { useNavigate } from "react-router-dom";

import Modal from "src/components/modal/Modal";

type Props = {
  message?: string;
  onCloseModal: () => void;
};

export default function ExitModal({ message, onCloseModal }: Props) {
  const navigate = useNavigate();
  const closeAndMoveToHome = () => {
    onCloseModal();
    navigate("/");
  };

  return (
    <Modal onCloseModal={closeAndMoveToHome}>
      <div className="px-8 py-4">
        <p className="text-slate-200">{message}</p>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={closeAndMoveToHome}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            type="button"
          >
            확인
          </button>
          <button
            onClick={onCloseModal}
            className="px-4 py-2 font-semibold text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
            type="button"
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
