import { Outlet } from "react-router-dom";

import { Navbar } from "src/components/dom/common/Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
}
