import DrawingEditor from "src/components/my/DrawingEditor";

import { ProfileCard } from "../components/common/ProfileCard";

export default function MyPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="sr-only">마이페이지</h1>
      <div className="border-b-1 w-full border border-slate-900 p-4">
        <span className="p-4 text-slate-200">내 프로필</span>
        <ProfileCard size="lg" />
      </div>
      <div className="w-full p-4 shadow-md">
        <span className="p-4 text-slate-200">얼굴 꾸미기</span>
        <DrawingEditor />
      </div>
    </div>
  );
}
