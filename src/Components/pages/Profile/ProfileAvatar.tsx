import { useRef } from "react";
import { Button } from "react-bootstrap";
import userDB from "../../../lib/usersDB";
import ProfileImage from "../../ProfileImage";
import UserData from "../../../Types/userData";
import { useState } from "react";
import { userSlice } from "../../../store/reducers/UserSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { updateUserData } from "../../../store/reducers/TweetSlice";

interface ProfileAvatarProps {
  isOwner: boolean;
  user: UserData;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user, isOwner }) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [disable, setDisable] = useState<boolean>(true);

  const setUser = userSlice.actions.setUser;
  const dispatch = useAppDispatch();

  async function handleUploadPicClick() {
    const file = imgRef!.current!.files![0];
    await userDB.addProfileImg(user!.uid, file);
    const newUserData = await userDB.getUserData(user.uid);
    dispatch(setUser(newUserData));
    await dispatch(updateUserData());

    imgRef!.current!.value = "";
    setDisable(true);
  }
  return (
    <>
      <span className="mt-2">Avatar</span>
      <div className="d-flex align-items-center">
        <div className="imgContainer">
          <ProfileImage pictureUrl={user.picture} />
        </div>
        {isOwner && (
          <>
            <input
              type="file"
              className="flex-grow-1 me-2"
              ref={imgRef}
              onChange={() => setDisable(imgRef.current?.value ? false : true)}
            />
            <Button
              variant="primary"
              className="align-self-center"
              onClick={handleUploadPicClick}
              disabled={disable}
            >
              Upload
            </Button>
          </>
        )}
      </div>
    </>
  );
};
export default ProfileAvatar;
