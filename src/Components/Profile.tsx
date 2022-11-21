import React from "react";
import "./style/Profile.css";
import { Button } from "react-bootstrap";
const Profile: React.FC = () => {
  return (
    <div className="profile">
      <div className="title">Profile</div>
      <label htmlFor="name">User name</label>
      <input type={"text"} name="name" />
      <Button variant="primary" type="submit">
        Save
      </Button>
    </div>
  );
};

export default Profile;
