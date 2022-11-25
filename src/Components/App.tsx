import React from "react";
import Home from "./Home";
import Register from "./Register";
import LogIn from "./LogIn";
import NavBar from "./NavBar";
import { useState } from "react";
import "./style/App.css";
import ErrorBoundary from "./ErrorBoundary";
import { User } from "firebase/auth";
import auth from "../lib/auth";

export type Pages = "Home" | "Profile" | "LogIn" | "Register";
const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Home");
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    auth.getUserName(setUser);
  }, []);

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
