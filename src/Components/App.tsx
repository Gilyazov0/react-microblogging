import Home from "./pages/Home/Home";
import NavBar from "./NavBar/NavBar";
import { useState, useEffect, createContext } from "react";
import "./style/App.css";
import ErrorBoundary from "./ErrorBoundary";
import auth from "../lib/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import UserData from "../Types/userData";
import Search from "./pages/Search";
import SearchProps from "../SearchTypes";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { pageSlice } from "../store/reducers/PageSlice";
import { viewSlice } from "../store/reducers/ViewSlice";

export const UserContext = createContext<UserData | null | undefined>(
  undefined
);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.pageReducer);
  const { setPage } = pageSlice.actions;
  const { setView } = viewSlice.actions;

  const [user, setUser] = useState<UserData | null | undefined>(undefined);
  const [searchData, setSearchData] = useState<SearchProps>({
    searchAt: "tweets",
    query: "",
  });

  useEffect(() => {
    auth.getUserUid(setUser);
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
  }, [page, user]);

  return (
    <ErrorBoundary>
      <div className="app">
        <UserContext.Provider value={user}>
          <NavBar
            page={page}
            setSearchData={setSearchData}
            searchAt={searchData.searchAt}
          />
          {page === "Home" && <Home />}
          {page === "SignUp" && <SignUp />}
          {page === "SignIn" && <SignIn />}
          {page === "Profile" && <Profile setUser={setUser} />}
          {page === "Search" && <Search {...searchData} />}
        </UserContext.Provider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
