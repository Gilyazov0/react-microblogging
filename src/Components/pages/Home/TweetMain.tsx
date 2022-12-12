import ProfileImage from "../../BaseComponents/ProfileImage";
import "../../style/Tweet.css";
import { Link } from "react-router-dom";
import { TweetProps } from "../../../Types/TweetProps";
import moment from "moment";

const TweetMain: React.FC<TweetProps> = ({
  content,
  userName,
  picture,
  date,
  userId,
}) => {
  return (
    <>
      <div className="d-flex">
        <div className="profile-img-container">
          <ProfileImage pictureUrl={picture} />
        </div>

        <Link to={`/profile/${userId}`}>{userName}</Link>
        <div className="flex-grow-1"></div>
        <div className="text-secondary">{moment(date).format("LLL")}</div>
      </div>
      <div>{content}</div>
    </>
  );
};

export default TweetMain;
