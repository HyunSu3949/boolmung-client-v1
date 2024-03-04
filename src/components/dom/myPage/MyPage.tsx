import React, { Suspense, lazy } from "react";

import { Spinner } from "src/components/dom/common/Spinner";
import DrawingEditor from "src/components/dom/myPage/DrawingEditor";

import { ProfileCard } from "../common/ProfileCard";

// const DrawingEditor = lazy(() => import("./DrawingEditor"));

export default function MyPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="sr-only">마이페이지</h1>
      <div className="w-full p-4 border border-b-1 border-slate-900">
        <span className="p-4 text-slate-200">내 프로필</span>
        <ProfileCard size="lg" />
      </div>
      <div className="w-full p-4 shadow-md">
        <span className="p-4 text-slate-200">얼굴 꾸미기</span>
        <Suspense fallback={<Spinner />}>
          <DrawingEditor />
        </Suspense>
      </div>
    </div>
  );
}
