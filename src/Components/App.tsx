import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import NavBar from "./NavBar";
import { useState } from "react";
import "./style/App.css";
import useLocalStorageState from "use-local-storage-state";
import ErrorBoundary from "./ErrorBoundary";

export type Pages = "Home" | "Profile" | "SignIn";
const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Home");

  const [user, setUser] = useLocalStorageState<string>("microBloggingApp", {
    defaultValue: "noName",
  });

  return (
    <ErrorBoundary>
      <div className="app">
        <NavBar currentPage={page} setPage={setPage} />
        {page === "Home" && <Home user={user} />}
        {page === "Profile" && <Profile user={user} setUser={setUser} />}
        {page === "SignIn" && <SignIn />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
