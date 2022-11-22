import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import NavBar from "./NavBar";
import { useState } from "react";
import "./style/App.css";

export type Pages = "Home" | "Profile";
const App: React.FC = () => {
  const [page, setPage] = useState<Pages>("Profile");

  return (
    <div className="app">
      <NavBar currentPage={page} setPage={setPage} />
      {page === "Home" && <Home />} {page === "Profile" && <Profile />}
    </div>
  );
};

export default App;
