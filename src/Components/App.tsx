import Home from "./pages/Home/Home";
import NavBar from "./NavBar/NavBar";
import { useState, useEffect } from "react";
import "./style/App.css";
import ErrorBoundary from "./ErrorBoundary";
import auth from "../lib/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { pageSlice } from "../store/reducers/PageSlice";
import { viewSlice } from "../store/reducers/ViewSlice";
import { userSlice } from "../store/reducers/UserSlice";
import UserData from "../Types/userData";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.pageReducer);
  const { setPage } = pageSlice.actions;
  const { setView } = viewSlice.actions;
  const { user } = useAppSelector((state) => state.userReducer);
  const { setUser } = userSlice.actions;

  useEffect(() => {
    auth.getUserUid((newUser: UserData | null | undefined) =>
      dispatch(setUser(newUser))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (page) {
      case "SignOut":
        dispatch(setPage("SignIn"));
        auth.logOut();
        dispatch(setView("all tweets"));
        break;

      case "Home":
        if (user === null) dispatch(setPage("SignIn"));
        break;

      case "SignIn":
        if (user) dispatch(setPage("Home"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, user]);

  return (
    <ErrorBoundary>
      <div className="app">
        <NavBar />
        {page === "Home" && <Home />}
        {page === "SignUp" && <SignUp />}
        {page === "SignIn" && <SignIn />}
        {page === "Profile" && <Profile />}
        {page === "Search" && <Search />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
