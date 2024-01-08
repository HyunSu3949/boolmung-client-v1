import React from "react";
import { useAuth } from "../Context/AuthContext";
import { logout } from "../../../apis/user/logout";
import { useNavigate } from "react-router-dom";

export const ProfileCard: React.FC = () => {
  const { currentUser, setIsLogedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsLogedIn(false);
    navigate("/login");
  };

  return (
    <div className="profile">
      <div>{`${currentUser.name} 님`}</div>
      <button onClick={handleLogout} className="logoutButton">
        logout
      </button>
    </div>
  );
};
