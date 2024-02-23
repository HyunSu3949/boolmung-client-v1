import { ProfileCard } from "../common/ProfileCard/ProfileCard";
import { DrawingEditor } from "./DrawingEditor";

export default function MyPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="sr-only">마이페이지</h1>
      <div className="border-b-1 w-full border border-slate-900 py-8">
        <ProfileCard size="lg" />
      </div>
      <div className="w-full shadow-md">
        <DrawingEditor />
      </div>
    </div>
  );
}
