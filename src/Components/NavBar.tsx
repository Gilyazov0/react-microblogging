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
            isActive={props.currentPage === "SignUp"}
            text={"Sign up"}
            pageName={"SignUp"}
          />
          <Link
            isActive={props.currentPage === "SignIn"}
            text={"Sign in"}
            pageName={"SignIn"}
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
          <Link isActive={false} text={"Sign out"} pageName={"SignOut"} />
        </>
      )}
    </div>
  );
};

export default NavBar;
