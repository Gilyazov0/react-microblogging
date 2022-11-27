import Home from "./Home";
import NavBar from "./NavBar";
import { useState, useEffect, createContext } from "react";
import "./style/App.css";
import ErrorBoundary from "./ErrorBoundary";
import auth from "../lib/auth";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Profile from "./Profile";
import UserData from "../Types/userData";
import userDB from "../lib/usersDB";

export type Pages = "Home" | "Profile" | "SignUp" | "SignIn" | "SignOut";

export const SetPageContext = createContext<(page: Pages) => void>(
  (page: Pages) => {}
);
export const UserContext = createContext<UserData | null>(null);

const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Home");
  const [uid, setUid] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!uid) {
      setUser(null);
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
        break;

      case "Home":
        if (!user) setPage("SignIn");
        break;
    }
  }, [page]);

  return (
    <ErrorBoundary>
      <div className="app">
        <UserContext.Provider value={user}>
          <SetPageContext.Provider value={setPage}>
            <NavBar currentPage={page} />
            {page === "Home" && <Home />}
            {page === "SignUp" && <SignUp />}
            {page === "SignIn" && <SignIn />}
            {page === "Profile" && <Profile setUser={setUser} />}
          </SetPageContext.Provider>
        </UserContext.Provider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
