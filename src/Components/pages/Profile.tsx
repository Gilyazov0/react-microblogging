import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import userDB from "../../lib/usersDB";
import UserData from "../../Types/userData";
import ProfileImage from "../ProfileImage";
import "../style/Profile.css";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";

const Profile: React.FC = () => {
  // const user = useAppSelector((state) => state.user.user as UserData);
  const { profileUid } = useAppSelector((state) => state.profile);

  const [profileUser, setProfileUser] = useState<UserData | null>(null);

  useEffect(() => {
    (async (uid: string) => {
      const user = await userDB.getUserData(uid);
      setProfileUser(user);
    })(profileUid);
  }, [profileUid]);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const setUser = userSlice.actions.setUser;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profileUser) return;

    nameRef.current!.value = profileUser.displayName;
    emailRef.current!.value = profileUser.email;
  }, [profileUser]);

  async function handleChangeNameClick() {
    await userDB.writeUserData(profileUser!.uid, {
      displayName: nameRef.current?.value,
    });
    const newUserData = await userDB.getUserData(profileUser!.uid);
    dispatch(setUser(newUserData));
  }

  async function handleUploadPicClick() {
    const file = imgRef!.current!.files![0];
    userDB.addProfileImg(profileUser!.uid, file);
  }

  return (
    <div className="profile mt-5">
      {profileUser && (
        <>
          <span className="mt-2">Avatar</span>
          <div className="d-flex align-items-center">
            <div className="imgContainer">
              <ProfileImage pictureUrl={profileUser.picture} />
            </div>
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
            <input
              type={"email"}
              className="flex-grow-1"
              ref={emailRef}
              disabled
            />
            <Button
              variant="primary"
              className="align-self-center ms-2"
              disabled
            >
              Change
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
