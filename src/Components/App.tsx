import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import NavBar from "./NavBar";
import { useState } from "react";
import "./style/App.css";

const App: React.FC = () => {
  const [page, setPage] = useState<"Home" | "Profile">("Profile");

  return (
    <div className="app">
      <NavBar />
      {page === "Home" && <Home />} {page === "Profile" && <Profile />}
    </div>
  );
};

export default App;
