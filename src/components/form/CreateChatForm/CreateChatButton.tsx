import { useDispatch } from "react-redux";

import { Svgs } from "src/components/common/Svgs";
import { openModal } from "src/redux/features/modalSlice";

export default function CreateChatButton() {
  const dispatch = useDispatch();
  const openCreateChatModal = () => {
    dispatch(
      openModal({
        componentId: "createChatModal",
      }),
    );
  };
  return (
    <button
      className="flex items-center rounded bg-slate-500 p-3 font-semibold text-slate-100 hover:bg-slate-400"
      onClick={openCreateChatModal}
      type="button"
    >
      <Svgs id="plus" size="1.25rem" title="플러스 아이콘" />
      방만들기
    </button>
  );
}
