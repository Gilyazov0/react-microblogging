import { useEffect, useState } from "react";
import userDB from "../lib/usersDB";
import UserData from "../Types/userData";
import "./style/ProfileImage.css";

const ProfileImage: React.FC<{ user: UserData }> = ({ user }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    async function getUrl() {
      if (!user.picture) return;
      const url = await userDB.getProfilePicUrl(user.picture);

      setUrl(url);
    }
    getUrl();
  }, [user]);

  return <img src={url} className={"me-2"} />;
};

export default ProfileImage;
