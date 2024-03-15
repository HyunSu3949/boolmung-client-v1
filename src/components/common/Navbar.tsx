import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { setLogoutState } from "src/redux/features/authSlice";
import { RootState } from "src/redux/store";
import { SpinnerWithText } from "src/components/common/SpinnerWithText";
import { Svgs } from "src/components/common/Svgs";
import { logout } from "src/utils/apis/getApis";

import { SoundButton } from "./SoundButton/SoundButton";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout({});
    dispatch(setLogoutState());
    setIsLoading(false);
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
        <NavLink to="/" className={getNavLinkClass}>
          <div className="flex items-center space-x-1">
            <Svgs id="chat" size="1.25rem" title="채팅 아이콘" />
            <span>채팅</span>
          </div>
        </NavLink>
      </div>
      <div className="flex items-center space-x-2">
        <NavLink to="/my" className={getNavLinkClass}>
          <div className="flex items-center space-x-1">
            <img
              src={user.image}
              alt="프로필 이미지"
              className="w-6 h-6 rounded-full"
            />
            <span>내 정보</span>
          </div>
        </NavLink>
      </div>
      <div>
        <button
          className="p-2 border rounded-md border-slate-800 bg-slate-700 hover:bg-slate-400"
          onClick={handleLogout}
          type="button"
        >
          <SpinnerWithText loading={isLoading}>
            <span>로그아웃</span>
          </SpinnerWithText>
        </button>
      </div>
    </nav>
  );
}
