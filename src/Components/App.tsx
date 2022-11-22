import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import NavBar from "./NavBar";
import { useState } from "react";
import "./style/App.css";
import useLocalStorageState from "use-local-storage-state";

export type Pages = "Home" | "Profile";
const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Profile");

  const [user, setUser] = useLocalStorageState<string>("microBloggingApp", {
    defaultValue: "noName",
  });

  return (
    <div className="app">
      <NavBar currentPage={page} setPage={setPage} />
      {page === "Home" && <Home user={user} />}{" "}
      {page === "Profile" && <Profile user={user} setUser={setUser} />}
    </div>
  );
};

export default App;
