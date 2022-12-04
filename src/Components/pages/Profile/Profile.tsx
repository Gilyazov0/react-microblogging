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

  useEffect(() => {
    (async (uid: string) => {
      const user = await userDB.getUserData(uid);
      setProfileUser(user);
    })(profileUid);
  }, [profileUid]);

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
          <ProfileAvatar
            isOwner={isOwner}
            user={isOwner ? user : profileUser}
          />
          <ProfileName isOwner={isOwner} user={profileUser} />
        </>
      )}
    </div>
  );
};

export default Profile;
