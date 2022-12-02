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
import userDB from "../lib/usersDB";
import Search from "./pages/Search";
import SearchProps from "../SearchTypes";
import ViewType from "../Types/ViewType";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { pageSlice } from "../store/reducers/PageSlice";

export const UserContext = createContext<UserData | null | undefined>(
  undefined
);
export const ViewTypeContext = createContext<ViewType>("all tweets");

const App: React.FC = () => {
  const { page } = useAppSelector((state) => state.pageReducer);
  const { setPage } = pageSlice.actions;
  const dispatch = useAppDispatch();

  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const [user, setUser] = useState<UserData | null | undefined>(undefined);
  const [viewType, setViewType] = useState<ViewType>("all tweets");
  const [searchData, setSearchData] = useState<SearchProps>({
    searchAt: "tweets",
    query: "",
  });

  useEffect(() => {
    if (typeof uid !== "string") {
      setUser(uid);
      return;
    }
    async function setUserData(uid: string) {
      const data = (await userDB.getUserData(uid)) as UserData;
      data["uid"] = uid;
      setUser(data);
    }
    setUserData(uid);
  }, [uid]);

  useEffect(() => {
    auth.getUserUid(setUid);
  }, []);

  useEffect(() => {
    switch (page) {
      case "SignOut":
        dispatch(setPage("SignIn"));
        auth.logOut();
        setViewType("all tweets");
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
          <ViewTypeContext.Provider value={viewType}>
            <NavBar
              page={page}
              setViewType={setViewType}
              setSearchData={setSearchData}
              searchAt={searchData.searchAt}
            />
            {page === "Home" && <Home />}
            {page === "SignUp" && <SignUp />}
            {page === "SignIn" && <SignIn />}
            {page === "Profile" && <Profile setUser={setUser} />}
            {page === "Search" && <Search {...searchData} />}
          </ViewTypeContext.Provider>
        </UserContext.Provider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
