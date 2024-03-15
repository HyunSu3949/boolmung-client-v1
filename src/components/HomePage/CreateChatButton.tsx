import { useDispatch } from "react-redux";

import { Svgs } from "src/components/common/Svgs";
import CreateChatModal from "src/components/modal/CreateChatModal";
import { openModal } from "src/redux/features/modalSlice";

export default function CreateChatButton() {
  const dispatch = useDispatch();
  const openCreateChatModal = () => {
    dispatch(
      openModal({
        Component: CreateChatModal,
      }),
    );
  };
  return (
    <button
      className="flex items-center p-3 font-semibold rounded bg-slate-500 text-slate-100 hover:bg-slate-400"
      onClick={openCreateChatModal}
      type="button"
    >
      <Svgs id="plus" size="1.25rem" title="플러스 아이콘" />
      방만들기
    </button>
  );
}
