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
        setPage={props.setPage}
        isActive={props.currentPage === "Home"}
        text={"Home"}
        pageName={"Home"}
      />
      <Link
        setPage={props.setPage}
        isActive={props.currentPage === "Register"}
        text={"Register"}
        pageName={"Register"}
      />
      <Link
        setPage={props.setPage}
        isActive={props.currentPage === "LogIn"}
        text={"Log in"}
        pageName={"LogIn"}
      />
      <Link
        setPage={props.setPage}
        isActive={false}
        text={props.userName}
        pageName={"Profile"}
      />
      <Link
        setPage={props.setPage}
        isActive={false}
        text={"Log out"}
        pageName={"LogOut"}
      />
    </div>
  );
};

export default NavBar;
