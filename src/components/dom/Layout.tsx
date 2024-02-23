import { Outlet } from "react-router-dom";

import { Navbar } from "src/components/dom/common/Navbar";

export default function Layout() {
  return (
    <div className="flex w-full flex-col">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
