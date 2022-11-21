import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import { useState } from "react";

const App: React.FC = () => {
  const [page, setPage] = useState<"Home" | "Profile">("Profile");

  return (
    <div>
      {page === "Home" && <Home />} {page === "Profile" && <Profile />}
    </div>
  );
};

export default App;
