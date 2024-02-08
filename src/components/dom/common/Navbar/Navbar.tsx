import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "src/apis/user/logout";
import { setLogoutState } from "src/redux/features/authSlice";

import { ProfileCard } from "../ProfileCard/ProfileCard";
import { SoundButton } from "../SoundButton/SoundButton";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(setLogoutState());
    navigate("/");
  };

  return (
    <nav className="w-fit flex-col bg-slate-600 p-6">
      <div className="mb-4">
        <SoundButton />
      </div>
      <div className="mb-4">
        <Link to="/">home</Link>
      </div>
      <div className="mb-4">
        <Link to="/newface">newface</Link>
      </div>
      <div className="mb-4">
        <Link to="/my">
          <ProfileCard size="sm" />
        </Link>
      </div>
      <div>
        <button
          className="p rounded bg-slate-400 p-3 px-6"
          onClick={handleLogout}
          type="button"
        >
          logout
        </button>
      </div>
    </nav>
  );
}
