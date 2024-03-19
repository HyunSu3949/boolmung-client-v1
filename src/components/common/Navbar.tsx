import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { setLogoutState } from "src/redux/features/authSlice";
import { RootState } from "src/redux/store";
import { SpinnerWithComponent } from "src/components/common/SpinnerWithComponent";
import { Svgs } from "src/components/common/Svgs";
import { logout } from "src/utils/apis/getApis";

import { SoundButton } from "./SoundButton";
import MyImage from "./MyImage";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({});
    dispatch(setLogoutState());
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-bold text-slate-200" : "text-slate-300";

  return (
    <nav className="flex w-full items-center justify-between bg-slate-600 p-6 text-slate-100">
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
            <MyImage size="sm" />
            <span>내 정보</span>
          </div>
        </NavLink>
      </div>
      <div>
        <button
          className="rounded-md border border-slate-800 bg-slate-700 p-2 hover:bg-slate-400"
          onClick={handleLogout}
          type="button"
        >
          <span>로그아웃</span>
        </button>
      </div>
    </nav>
  );
}
