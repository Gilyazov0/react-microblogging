import React from "react";
import "./style/NavBar.css";

const NavBar: React.FC = () => {
  return (
    <div className="nav-bar">
      <span className="link">Home</span> <span className="link">Profile</span>
    </div>
  );
};

export default NavBar;
