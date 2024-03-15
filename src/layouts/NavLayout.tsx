import { Outlet } from "react-router-dom";

import { Navbar } from "src/components/common/Navbar";

export default function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
