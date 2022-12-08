import "../style/NavBar.css";
import ProfileImage from "../BaseComponents/ProfileImage";
import ViewSelector from "./ViewSelector";
import SearchBar from "./SearchBar";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { viewSlice } from "../../store/reducers/ViewSlice";
import auth from "../../lib/auth";
import StyledLink from "./StyledLink";

const NavBar: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { setView } = viewSlice.actions;

  const dispatch = useAppDispatch();

  return (
    <div className="nav-bar">
      <StyledLink to="/">Home</StyledLink>
      <ViewSelector />
      <div className="hide-on-small-screen">
        <SearchBar />
      </div>
      {!user && (
        <>
          <StyledLink to="/signUp">Sign up</StyledLink>
          <StyledLink to="/signIn">Sign in</StyledLink>
        </>
      )}
      {user && (
        <>
          <div className="d-flex align-items-center">
            <div className="nav-bar-img hide-on-small-screen">
              <ProfileImage pictureUrl={user.picture} />
            </div>
            <StyledLink to={`/profile/${user.uid}`}>Profile</StyledLink>
          </div>
          <div
            onClick={() => {
              auth.logOut();
              dispatch(setView("all tweets"));
            }}
          >
            <StyledLink to="/signIn">Sign out</StyledLink>
          </div>
          <div className="hide-on-big-screen">
            <SearchBar />
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
