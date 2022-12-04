import "../style/NavBar.css";
import Link from "./Link";
import ProfileImage from "../ProfileImage";
import ViewSelector from "./ViewSelector";
import SearchBar from "./SearchBar";
import { useAppSelector } from "../../hooks/redux";

const NavBar: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const userName = user
    ? user.displayName
      ? user.displayName
      : user.email!
    : "";

  return (
    <div className="nav-bar">
      <Link text={"Home"} pageName={"Home"} />
      <ViewSelector />
      <div className="flex-grow-1"></div>
      <div>
        <SearchBar />
      </div>
      <div className="flex-grow-1"></div>
      {!user && (
        <>
          <Link text={"Sign up"} pageName={"SignUp"} />
          <Link text={"Sign in"} pageName={"SignIn"} />
        </>
      )}
      {user && (
        <>
          <ProfileImage pictureUrl={user.picture} />
          <Link text={userName} pageName={"Profile"} />
          <Link text={"Sign out"} pageName={"SignOut"} />
        </>
      )}
    </div>
  );
};

export default NavBar;
