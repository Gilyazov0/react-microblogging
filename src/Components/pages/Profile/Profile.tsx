import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import userDB from "../../../lib/usersDB";
import UserData from "../../../Types/userData";
import "../../style/Profile.css";
import { useAppSelector } from "../../../hooks/redux";
import Loading from "../../Loading";
import ProfileAvatar from "./ProfileAvatar";
import ProfileName from "./ProfileName";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.user as UserData);
  const { profileUid } = useAppSelector((state) => state.profile);

  const [profileUser, setProfileUser] = useState<UserData | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async (uid: string) => {
      const user = await userDB.getUserData(uid);
      setProfileUser(user);
    })(profileUid);
  }, [profileUid]);

  useEffect(() => {
    if (!profileUser) return;

    emailRef.current!.value = profileUser.email;
  }, [profileUser]);

  const isOwner = profileUid === user.uid;

  return (
    <div className="profile mt-5 ">
      {!profileUser && (
        <div className="align-self-center">
          <Loading />
        </div>
      )}
      {profileUser && (
        <>
          <ProfileAvatar isOwner={isOwner} user={profileUser} />
          <ProfileName isOwner={isOwner} user={profileUser} />

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
