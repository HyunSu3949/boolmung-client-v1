import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "src/redux/store";

export default function RequireAuth() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.reducer.authReducer.isLoggedIn,
  );

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
