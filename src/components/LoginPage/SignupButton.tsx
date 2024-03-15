import { useDispatch } from "react-redux";

import { openModal } from "src/redux/features/modalSlice";

export default function SignupButton() {
  const dispatch = useDispatch();
  const openSignupModal = () => {
    dispatch(
      openModal({
        componentId: "signupModal",
      }),
    );
  };
  return (
    <button
      className="w-full px-6 py-2 mt-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={openSignupModal}
      type="button"
    >
      회원가입
    </button>
  );
}
