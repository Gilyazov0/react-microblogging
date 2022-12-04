import { useRef } from "react";
import { Button } from "react-bootstrap";
import userDB from "../../../lib/usersDB";
import { userSlice } from "../../../store/reducers/UserSlice";
import UserData from "../../../Types/userData";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect } from "react";

interface ProfileNameProps {
  isOwner: boolean;
  user: UserData;
}
const ProfileName: React.FC<ProfileNameProps> = ({ user, isOwner }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const setUser = userSlice.actions.setUser;
  const dispatch = useAppDispatch();

  async function handleChangeNameClick() {
    console.log(nameRef.current?.value, user);
    await userDB.writeUserData(user.uid, {
      displayName: nameRef.current?.value,
    });
    const newUserData = await userDB.getUserData(user!.uid);
    dispatch(setUser(newUserData));
  }

  useEffect(() => {
    nameRef.current!.value = user.displayName;
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
        <Button
          variant="primary"
          className="align-self-center"
          onClick={handleChangeNameClick}
        >
          Change
        </Button>
      </div>
    </>
  );
};
export default ProfileName;
