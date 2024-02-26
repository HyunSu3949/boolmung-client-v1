import { Outlet } from "react-router-dom";

import { Navbar } from "src/components/dom/common/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
