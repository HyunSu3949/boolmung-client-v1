import React from "react";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navBar">
      <ProfileCard />
    </nav>
  );
};
