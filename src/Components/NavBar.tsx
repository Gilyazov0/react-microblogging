import React, { useContext } from "react";
import { Pages } from "./App";
import "./style/NavBar.css";
import Link from "./Link";
import { UserContext } from "./App";

interface NavBarProps {
  currentPage: Pages;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const user = useContext(UserContext);
  const userName = user
    ? user.displayName
      ? user.displayName
      : user.email!
    : "";
  return (
    <div className="nav-bar">
      <Link
        isActive={props.currentPage === "Home"}
        text={"Home"}
        pageName={"Home"}
      />
      <div className="flex-grow-1"></div>
      {!userName && (
        <>
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
        </>
      )}
      {userName && (
        <>
          <Link
            isActive={props.currentPage === "Profile"}
            text={userName}
            pageName={"Profile"}
          />
          <Link isActive={false} text={"Log out"} pageName={"LogOut"} />
        </>
      )}
    </div>
  );
};

export default NavBar;
