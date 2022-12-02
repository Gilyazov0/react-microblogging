import { useContext } from "react";
import "../style/NavBar.css";
import Link from "./Link";
import { UserContext } from "../App";
import ProfileImage from "../ProfileImage";
import ViewSelector from "./ViewSelector";
import SearchBar from "./SearchBar";
import Pages from "../../Types/Pages";
import SearchProps, { SearchAtType } from "../../SearchTypes";

const NavBar: React.FC<{
  page: Pages;
  setSearchData: React.Dispatch<React.SetStateAction<SearchProps>>;
  searchAt: SearchAtType;
}> = ({ page, setSearchData, searchAt }) => {
  const user = useContext(UserContext);
  const userName = user
    ? user.displayName
      ? user.displayName
      : user.email!
    : "";

  return (
    <div className="nav-bar">
      <Link isActive={page === "Home"} text={"Home"} pageName={"Home"} />
      <ViewSelector />
      <div className="flex-grow-1"></div>
      <div>
        <SearchBar
          isActive={page === "Search"}
          setSearchData={setSearchData}
          searchAt={searchAt}
        />
      </div>
      <div className="flex-grow-1"></div>
      {!user && (
        <>
          <Link
            isActive={page === "SignUp"}
            text={"Sign up"}
            pageName={"SignUp"}
          />
          <Link
            isActive={page === "SignIn"}
            text={"Sign in"}
            pageName={"SignIn"}
          />
        </>
      )}
      {user && (
        <>
          <ProfileImage pictureUrl={user.picture} />
          <Link
            isActive={page === "Profile"}
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
