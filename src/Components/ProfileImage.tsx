import { useContext, useEffect, useState } from "react";
import userDB from "../lib/usersDB";
import UserData from "../Types/userData";
import { UserContext } from "./App";
import "./style/ProfileImage.css";

const ProfileImage: React.FC<{ pictureUrl: string | undefined }> = ({
  pictureUrl,
}) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    async function getUrl() {
      if (!pictureUrl) return;
      const url = await userDB.getProfilePicUrl(pictureUrl);
      setUrl(url);
    }
    getUrl();
  }, [pictureUrl]);

  return <img src={url ? url : "./no-image.png"} className={"me-2"} />;
};

export default ProfileImage;
