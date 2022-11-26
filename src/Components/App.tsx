import React from "react";
import Home from "./Home";
import Register from "./Register";
import LogIn from "./LogIn";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import "./style/App.css";
import ErrorBoundary from "./ErrorBoundary";
import { User } from "firebase/auth";
import auth from "../lib/auth";

export type Pages = "Home" | "Profile" | "LogIn" | "Register" | "LogOut";

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
      case "LogOut":
        setPage("LogIn");
        auth.logOut();
        break;

      case "Home":
        if (!user) setPage("LogIn");
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
            {page === "Register" && <Register />}
            {page === "LogIn" && <LogIn />}
          </SetPageContext.Provider>
        </UserContext.Provider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
