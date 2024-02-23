import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "src/apis/user/logout";
import { setLogoutState } from "src/redux/features/authSlice";
import { RootState } from "src/redux/store";

import { ProfileCard } from "./ProfileCard/ProfileCard";
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

  return (
    <nav className="flex w-full items-center justify-between bg-slate-600 p-6 text-slate-100">
      <div>
        <SoundButton />
      </div>
      <div className="flex items-center space-x-2">
        <img src="/img/home.svg" alt="홈 아이콘" className="h-6 w-6" />
        <Link to="/">채팅</Link>
      </div>
      <div>
        <Link to="/my" className="flex space-x-2">
          <img
            src={user.image}
            alt="프로필 이미지"
            className="h-6 w-6 rounded-full"
          />
          <span>내 정보</span>
        </Link>
      </div>
      <div>
        <button
          className="hover:decoration-2"
          onClick={handleLogout}
          type="button"
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}
