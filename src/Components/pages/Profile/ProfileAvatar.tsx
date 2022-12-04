import { useRef } from "react";
import { Button } from "react-bootstrap";
import userDB from "../../../lib/usersDB";
import ProfileImage from "../../ProfileImage";
import UserData from "../../../Types/userData";

interface ProfileAvatarProps {
  isOwner: boolean;
  user: UserData;
}
const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user, isOwner }) => {
  const imgRef = useRef<HTMLInputElement>(null);

  async function handleUploadPicClick() {
    const file = imgRef!.current!.files![0];
    userDB.addProfileImg(user!.uid, file);
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
            <input type="file" className="flex-grow-1 me-2" ref={imgRef} />
            <Button
              variant="primary"
              className="align-self-center"
              onClick={handleUploadPicClick}
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
