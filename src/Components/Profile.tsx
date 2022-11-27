import React, { useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import userDB from "../lib/usersDB";
import { UserContext } from "./App";

const Profile: React.FC<{ setUser: Function }> = (props: {
  setUser: Function;
}) => {
  const user = useContext(UserContext);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    nameRef.current!.value = user.displayName;
    emailRef.current!.value = user.email;
  }, []);

  async function handleChangeNameClick() {
    await userDB.writeUserData(user!.uid, {
      displayName: nameRef.current?.value,
    });
    const newUserData = await userDB.getUserData(user!.uid);
    props.setUser(newUserData);
  }

  return (
    <div className="profile mt-5">
      <label htmlFor="name">Name</label>

      <div className="d-flex align-items-center">
        <input
          type={"text"}
          name="name"
          className="flex-grow-1 me-2"
          ref={nameRef}
        />
        <Button
          variant="primary"
          type="submit"
          className="align-self-center"
          onClick={handleChangeNameClick}
        >
          Change
        </Button>
      </div>

      <label htmlFor="email" className="mt-2">
        Email
      </label>
      <div className="d-flex align-items-center">
        <input
          type={"email"}
          name="email"
          className="flex-grow-1 me-2"
          ref={emailRef}
          disabled
        />
        <Button
          variant="primary"
          type="submit"
          className="align-self-center"
          disabled
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default Profile;
