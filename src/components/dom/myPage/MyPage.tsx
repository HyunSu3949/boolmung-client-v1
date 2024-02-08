import { useDispatch, useSelector } from "react-redux";

import ProfileImageEditor from "src/components/dom/myPage/ImageEditor/ImageEditor";
import { increment } from "src/redux/features/counterSlice";

import { ProfileCard } from "../common/ProfileCard/ProfileCard";
import { RootState } from "src/redux/store";

export default function MyPage() {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counterReducer.value);
  return (
    <>
      <h1>마이페이지</h1>
      <div className="flex-col justify-center">
        <ProfileCard size="lg" />
        <div>얼굴 꾸미기</div>
        <ProfileImageEditor />
      </div>
      <div className="text-slate-200">{counter}</div>
      <button
        type="button"
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
    </>
  );
}
