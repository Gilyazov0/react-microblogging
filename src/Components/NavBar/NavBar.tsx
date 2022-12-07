import "../style/NavBar.css";
import ProfileImage from "../BaseComponents/ProfileImage";
import ViewSelector from "./ViewSelector";
import SearchBar from "./SearchBar";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { NavLink } from "react-router-dom";
import { viewSlice } from "../../store/reducers/ViewSlice";
import auth from "../../lib/auth";

const NavBar: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { setView } = viewSlice.actions;

  const dispatch = useAppDispatch();

  return (
    <div className="nav-bar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "link-active" : "link-not-active"
        }
      >
        Home
      </NavLink>
      <ViewSelector />
      <div className="flex-grow-1"></div>
      <div>
        <SearchBar />
      </div>
      <div className="flex-grow-1"></div>
      {!user && (
        <>
          <NavLink
            to="/signUp"
            className={({ isActive }) =>
              isActive ? "link-active" : "link-not-active"
            }
          >
            Sign up
          </NavLink>
          <NavLink
            to="/signIn"
            className={({ isActive }) =>
              isActive ? "link-active" : "link-not-active"
            }
          >
            Sign in
          </NavLink>
        </>
      )}
      {user && (
        <>
          <ProfileImage pictureUrl={user.picture} />
          <NavLink
            to={`/profile/${user.uid}`}
            className={({ isActive }) =>
              isActive ? "link-active" : "link-not-active"
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/signIn"
            className={({ isActive }) =>
              isActive ? "link-active" : "link-not-active"
            }
            onClick={() => {
              auth.logOut();
              dispatch(setView("all tweets"));
            }}
          >
            Sign out
          </NavLink>
        </>
      )}
    </div>
  );
};

export default NavBar;
