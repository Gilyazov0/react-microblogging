import React from "react";
import { Pages } from "./App";
import "./style/NavBar.css";

interface NavBarProps {
  currentPage: Pages;
  setPage: (page: Pages) => void;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  return (
    <div className="nav-bar">
      <span
        onClick={() => props.setPage("Home")}
        className={`link ${
          props.currentPage === "Home" ? "" : "text-secondary"
        }`}
      >
        Home
      </span>
      <span
        onClick={() => props.setPage("Profile")}
        className={`link ${
          props.currentPage === "Profile" ? "" : "text-secondary"
        }`}
      >
        Profile
      </span>
      <span
        onClick={() => props.setPage("SignIn")}
        className={`link ${
          props.currentPage === "SignIn" ? "" : "text-secondary"
        }`}
      >
        SignIn
      </span>
    </div>
  );
};

export default NavBar;
