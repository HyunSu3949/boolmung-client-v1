import { useDispatch } from "react-redux";

import { closeModal } from "src/redux/features/modalSlice";

export default function Buttons() {
  const dispatch = useDispatch();

  const onCloseMdoal = () => {
    dispatch(closeModal("signupModal"));
  };
  return (
    <div className="flex justify-center">
      <div className="space-x-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 p-4 text-slate-200 hover:bg-blue-400"
        >
          회원가입
        </button>
        <button
          type="button"
          className="rounded-md bg-slate-500 p-4 text-slate-200 hover:bg-slate-300"
          onClick={onCloseMdoal}
        >
          취소
        </button>
      </div>
    </div>
  );
}
