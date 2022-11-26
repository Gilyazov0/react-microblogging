import React from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import "./style/App.css";
import ErrorBoundary from "./ErrorBoundary";
import { User } from "firebase/auth";
import auth from "../lib/auth";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export type Pages = "Home" | "Profile" | "SignUp" | "SignIn" | "SignOut";

export const SetPageContext = React.createContext<(page: Pages) => void>(
  (page: Pages) => {}
);
export const UserContext = React.createContext<User | null>(null);

const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Home");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.getUserName(setUser);
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
          </SetPageContext.Provider>
        </UserContext.Provider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
