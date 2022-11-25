import React from "react";
import { Pages } from "./App";
import "./style/NavBar.css";
import Link from "./Link";
import Auth from "../lib/auth";

interface NavBarProps {
  currentPage: Pages;
  setPage: (page: Pages) => void;
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
    </div>
  );
};

export default NavBar;
