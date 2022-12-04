import { useRef } from "react";
import { Button } from "react-bootstrap";
import userDB from "../../../lib/usersDB";
import { userSlice } from "../../../store/reducers/UserSlice";
import UserData from "../../../Types/userData";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect } from "react";
import { updateUserData } from "../../../store/reducers/TweetSlice";

interface ProfileNameProps {
  isOwner: boolean;
  user: UserData;
}
const ProfileName: React.FC<ProfileNameProps> = ({ user, isOwner }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const setUser = userSlice.actions.setUser;
  const dispatch = useAppDispatch();

  async function handleChangeNameClick() {
    await userDB.writeUserData(user.uid, {
      displayName: nameRef.current?.value,
    });
    const newUserData = await userDB.getUserData(user!.uid);
    dispatch(setUser(newUserData));
    dispatch(updateUserData());
  }

  useEffect(() => {
    nameRef.current!.value = user.displayName ? user.displayName : user.email;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <span className="mt-2">Name</span>
      <div className="d-flex align-items-center">
        <input
          type={"text"}
          className="flex-grow-1 me-2"
          ref={nameRef}
          disabled={!isOwner}
        />
        {isOwner && (
          <Button
            variant="primary"
            className="align-self-center"
            onClick={handleChangeNameClick}
          >
            Change
          </Button>
        )}
      </div>
    </>
  );
};
export default ProfileName;
