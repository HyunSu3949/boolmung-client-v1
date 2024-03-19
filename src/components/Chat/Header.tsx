import { useDispatch, useSelector } from "react-redux";

import { SoundButton } from "src/components/common/SoundButton/SoundButton";
import { Svgs } from "src/components/common/Svgs";
import { openModal } from "src/redux/features/modalSlice";
import { RootState } from "src/redux/store";

export default function Header() {
  const { title } = useSelector(
    (state: RootState) => state.reducer.socketReducer.roomInfo,
  );
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(
      openModal({
        componentId: "exitModal",
        props: {
          message: "정말 나가시겠어요?",
        },
      }),
    );
  };

  return (
    <>
      <div className="absolute p-4 rounded-md left-3 bg-slate-600">
        <SoundButton />
      </div>
      <button
        onClick={onClick}
        className="flex items-center px-4 py-2 text-white rounded bg-slate-600 hover:bg-slate-400 focus:outline-none"
        type="button"
      >
        <Svgs id="exit" size="1.25rem" title="나가기 아이콘" />
        나가기
      </button>
      <p className="text-xl text-white">{title}</p>
    </>
  );
}
