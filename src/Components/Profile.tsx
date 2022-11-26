import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./App";

const Profile: React.FC = () => {
  const user = useContext(UserContext);

  //   useEffect(async ()=>{},[])
  //   const {dispalyName, email} =

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input type={"text"} name="name" />

      <label htmlFor="email" className="mt-2">
        Email
      </label>

      <input type={"email"} name="email" />

      <Button variant="primary" type="submit">
        Sing in
      </Button>
    </div>
  );
};

export default Profile;
