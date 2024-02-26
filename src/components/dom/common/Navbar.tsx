import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "src/apis/user/logout";
import { setLogoutState } from "src/redux/features/authSlice";
import { RootState } from "src/redux/store";

import { SoundButton } from "./SoundButton/SoundButton";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const handleLogout = async () => {
    await logout();
    dispatch(setLogoutState());
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-bold text-slate-200" : "text-slate-300";

  return (
    <nav className="flex items-center justify-between w-full p-6 bg-slate-600 text-slate-100">
      <div>
        <SoundButton />
      </div>
      <div className="flex items-center space-x-2">
        <img src="/img/chat.svg" alt="채팅 아이콘" className="w-5 h-5" />
        <NavLink to="/" className={getNavLinkClass}>
          채팅
        </NavLink>
      </div>
      <div className="flex items-center space-x-2">
        <img
          src={user.image}
          alt="프로필 이미지"
          className="w-6 h-6 rounded-full"
        />
        <NavLink to="/my" className={getNavLinkClass}>
          <span>내 정보</span>
        </NavLink>
      </div>
      <div>
        <button
          className="p-2 border rounded-md border-slate-800 bg-slate-700 hover:bg-slate-400"
          onClick={handleLogout}
          type="button"
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}
