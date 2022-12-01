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
import Pages from "../Types/Pages";
import SearchProps from "../SearchTypes";
import ViewType from "../Types/ViewType";

export const SetPageContext = createContext<(page: Pages) => void>(
  (page: Pages) => {}
);
export const UserContext = createContext<UserData | null | undefined>(
  undefined
);
export const ViewTypeContext = createContext<ViewType>("all tweets");

const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Home");
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
        setPage("SignIn");
        auth.logOut();
        setViewType("all tweets");
        break;

      case "Home":
        if (user === null) setPage("SignIn");
        break;

      case "SignIn":
        if (user) setPage("Home");
    }
  }, [page, user]);

  return (
    <ErrorBoundary>
      <div className="app">
        <UserContext.Provider value={user}>
          <SetPageContext.Provider value={setPage}>
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
          </SetPageContext.Provider>
        </UserContext.Provider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
