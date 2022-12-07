import moment from "moment";
import { TweetProps } from "../../../Types/TweetProps";
import ProfileImage from "../../BaseComponents/ProfileImage";
import "../../style/Tweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import { useAppSelector } from "../../../hooks/redux";
import FollowIcon from "./FollowIcon";
import { Link } from "react-router-dom";

const Tweet: React.FC<TweetProps> = ({
  content,
  userName,
  picture,
  date,
  id,
  like,
  userId,
}) => {
  const { view } = useAppSelector((state) => state.view);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div
      className={`tweet ${view === "all tweets" ? "all-tweets" : "my-tweets"}`}
    >
      <div className="d-flex">
        <div className="profile-img-container">
          <ProfileImage pictureUrl={picture} />
        </div>

        <Link to={`/profile/${userId}`}>{userName}</Link>
        <div className="flex-grow-1"></div>
        <div className="text-secondary">
          {moment(date).format("MMM Mo HH:mm A")}
        </div>
      </div>
      <div>{content}</div>
      <div className="img-container">
        <img
          src="./like.svg"
          alt="like"
          className={`icon-img ${like ? "selected" : ""}`}
          onClick={(e) => {
            e.currentTarget.classList.toggle("selected");
            tweetsDB.toggleLike(id!, user!.uid);
          }}
        />
        {userId !== user?.uid && <FollowIcon authorId={userId} />}
      </div>
    </div>
  );
};

export default Tweet;
