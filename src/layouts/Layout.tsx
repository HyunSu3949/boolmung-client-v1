import { Outlet, useParams } from "react-router-dom";

import { ChatScene } from "src/components/canvas/scene/ChatScene";
import HomeScene from "src/components/canvas/scene/HomeScene";

export default function Layout() {
  const { roomid } = useParams();

  return (
    <div className="grid h-screen w-full grid-cols-[minmax(42rem,_1fr)_30rem] gap-1 overflow-hidden bg-neutral-900">
      <section className="rounded-lg">
        {roomid ? <ChatScene /> : <HomeScene />}
      </section>
      <section className="flex h-screen flex-col overflow-hidden rounded-lg bg-neutral-800">
        <Outlet />
      </section>
    </div>
  );
}
