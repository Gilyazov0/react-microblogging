import React from "react";
import { Pages } from "./App";
import "./style/NavBar.css";
import Link from "./Link";

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
        isActive={props.currentPage === "Profile"}
        text={"Profile"}
        pageName={"Profile"}
      />
      <Link
        setPage={props.setPage}
        isActive={props.currentPage === "SignIn"}
        text={"Sign in"}
        pageName={"SignIn"}
      />
    </div>
  );
};

export default NavBar;
