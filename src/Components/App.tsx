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

const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Home");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.getUserName(setUser);
  }, []);

  useEffect(() => {
    if (page === "LogOut") {
      auth.logOut();
      setPage("Home");
    }
  }, [page]);

  return (
    <ErrorBoundary>
      <div className="app">
        <NavBar
          currentPage={page}
          setPage={setPage}
          userName={
            user ? (user.displayName ? user.displayName : user.email!) : ""
          }
        />
        {page === "Home" && <Home user={""} />}
        {page === "Register" && <Register />}
        {page === "LogIn" && <LogIn />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
