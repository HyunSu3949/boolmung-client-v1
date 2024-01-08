import React from "react";
import { RoomList } from "./roomList/RoomList";
import { ProfileCard } from "../common/ProfileCard/ProfileCard";
import LoginScene from "../canvas/LoginScene";
import "./HomePage.css";
import { Navbar } from "./../common/Navbar/Navbar";

export const HomePage = () => {
  return (
    <>
      <LoginScene />
      <Navbar />
      <div className="side">
        <RoomList />
      </div>
    </>
  );
};
