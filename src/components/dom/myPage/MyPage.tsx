import { useDispatch, useSelector } from "react-redux";

import ProfileImageEditor from "src/components/dom/myPage/ImageEditor/ImageEditor";
import { increment } from "src/redux/features/counterSlice";
import { RootState } from "src/redux/store";

import { ProfileCard } from "../common/ProfileCard/ProfileCard";

export default function MyPage() {
  const dispatch = useDispatch();
  return (
    <>
      <h1>마이페이지</h1>
      <div className="flex-col justify-center">
        <ProfileCard size="lg" />
        <div>얼굴 꾸미기</div>
        <ProfileImageEditor />
      </div>
    </>
  );
}
