import userDB from "../../../lib/usersDB";
import { useEffect, useState } from "react";
import UserData from "../../../Types/userData";
import ProfileImage from "../../BaseComponents/ProfileImage";
import "../../style/UserListItem.css";
import { Link } from "react-router-dom";

const UserListItem: React.FC<{ uid: string }> = ({ uid }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    (async () => {
      const user = await userDB.getUserData(uid);
      setUser(user);
    })();
  }, [uid]);
  return (
    <>
      {user && (
        <div className="user-list-item">
          <ProfileImage pictureUrl={user.picture} />

          <div>
            <Link to={`/profile/${uid}`}>
              {user.displayName} | Followers:
              {user.followers ? user.followers.length : 0}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserListItem;
