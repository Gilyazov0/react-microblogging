import { useContext } from "react";
import { Pages } from "../App";
import "../style/NavBar.css";
import Link from "./Link";
import { UserContext } from "../App";
import ProfileImage from "../ProfileImage";

const NavBar: React.FC<{ currentPage: Pages }> = ({ currentPage }) => {
  const user = useContext(UserContext);
  const userName = user
    ? user.displayName
      ? user.displayName
      : user.email!
    : "";
  return (
    <div className="nav-bar">
      <Link isActive={currentPage === "Home"} text={"Home"} pageName={"Home"} />
      <div className="flex-grow-1"></div>
      {!user && (
        <>
          <Link
            isActive={currentPage === "SignUp"}
            text={"Sign up"}
            pageName={"SignUp"}
          />
          <Link
            isActive={currentPage === "SignIn"}
            text={"Sign in"}
            pageName={"SignIn"}
          />
        </>
      )}
      {user && (
        <>
          <ProfileImage pictureUrl={user.picture} />
          <Link
            isActive={currentPage === "Profile"}
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
