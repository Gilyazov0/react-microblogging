import React from "react";
import { Pages } from "./App";
import "./style/NavBar.css";
import Link from "./Link";

interface NavBarProps {
  currentPage: Pages;
  setPage: (page: Pages) => void;
  userName: string;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  return (
    <div className="nav-bar">
      <Link
        isActive={props.currentPage === "Home"}
        text={"Home"}
        pageName={"Home"}
      />
      <Link
        isActive={props.currentPage === "Register"}
        text={"Register"}
        pageName={"Register"}
      />
      <Link
        isActive={props.currentPage === "LogIn"}
        text={"Log in"}
        pageName={"LogIn"}
      />
      <Link
        isActive={props.currentPage === "Profile"}
        text={props.userName}
        pageName={"Profile"}
      />
      <Link isActive={false} text={"Log out"} pageName={"LogOut"} />
    </div>
  );
};

export default NavBar;
