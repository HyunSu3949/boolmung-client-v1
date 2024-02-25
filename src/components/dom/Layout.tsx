import { Outlet } from "react-router-dom";

import { Navbar } from "src/components/dom/common/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
