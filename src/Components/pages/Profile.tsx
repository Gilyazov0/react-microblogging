import React, { useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import userDB from "../../lib/usersDB";
import { UserContext } from "../App";
import UserData from "../../Types/userData";

const Profile: React.FC<{ setUser: Function }> = (props: {
  setUser: Function;
}) => {
  const user = useContext(UserContext) as UserData;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current!.value = user.displayName;
    emailRef.current!.value = user.email;
  }, [user]);

  async function handleChangeNameClick() {
    await userDB.writeUserData(user.uid, {
      displayName: nameRef.current?.value,
    });
    const newUserData = await userDB.getUserData(user.uid);
    props.setUser(newUserData);
  }

  async function handleUploadPicClick() {
    const file = imgRef!.current!.files![0];
    userDB.addProfileImg(user.uid, file);
  }

  return (
    <div className="profile mt-5">
      <span className="mt-2">Avatar</span>
      <div className="d-flex align-items-center">
        <input type="file" className="flex-grow-1 me-2" ref={imgRef} />
        <Button
          variant="primary"
          className="align-self-center"
          onClick={handleUploadPicClick}
        >
          Upload
        </Button>
      </div>

      <span className="mt-2">Name</span>
      <div className="d-flex align-items-center">
        <input type={"text"} className="flex-grow-1 me-2" ref={nameRef} />
        <Button
          variant="primary"
          className="align-self-center"
          onClick={handleChangeNameClick}
        >
          Change
        </Button>
      </div>

      <span className="mt-2">Email</span>
      <div className="d-flex align-items-center">
        <input type={"email"} className="flex-grow-1" ref={emailRef} disabled />
        <Button variant="primary" className="align-self-center ms-2" disabled>
          Change
        </Button>
      </div>
    </div>
  );
};

export default Profile;
