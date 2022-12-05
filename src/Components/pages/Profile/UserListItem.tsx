import userDB from "../../../lib/usersDB";
import { useEffect, useState } from "react";
import UserData from "../../../Types/userData";
import ProfileImage from "../../ProfileImage";
import "../../style/UserListItem.css";
import Link from "../../NavBar/Link";
import { useAppDispatch } from "../../../hooks/redux";
import { profileSlice } from "../../../store/reducers/ProfileSlice";

const UserListItem: React.FC<{ uid: string }> = ({ uid }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const dispatch = useAppDispatch();
  const setProfileUid = profileSlice.actions.setProfileUid;

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
            <Link
              pageName="Profile"
              text={user.displayName}
              onClickExtra={() => dispatch(setProfileUid(uid))}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserListItem;
