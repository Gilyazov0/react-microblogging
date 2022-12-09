import React, { useEffect, useState } from "react";
import userDB from "../../../lib/usersDB";
import UserData from "../../../Types/userData";
import "../../style/Profile.css";
import { useAppSelector } from "../../../hooks/redux";
import Loading from "../../BaseComponents/Loading";
import ProfileAvatar from "./ProfileAvatar";
import ProfileName from "./ProfileName";
import ProfilePassword from "./ProfilePassword";
import UsersList from "./UsersList";
import { useParams } from "react-router-dom";
import useUnsignedRedirect from "../../../hooks/useUnsignedRedirect";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const { profileUid } = useParams();

  const [profileUser, setProfileUser] = useState<UserData | null>(null);

  useUnsignedRedirect();

  useEffect(() => {
    (async (uid: string) => {
      const user = await userDB.getUserData(uid);
      setProfileUser(user);
    })(profileUid!);
  }, [profileUid]);

  const isOwner = profileUid === user?.uid;

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
            user={isOwner ? user! : profileUser}
          />
          <ProfileName isOwner={isOwner} user={profileUser} />
          {isOwner && <ProfilePassword />}
          <div className="d-flex">
            <div className="col">
              <UsersList uids={profileUser!.follow} title="Follow:" />
            </div>
            <div className="col">
              <UsersList uids={profileUser!.followers} title="Followers:" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
