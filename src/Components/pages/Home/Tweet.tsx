import moment from "moment";
import { useContext } from "react";
import { TweetProps } from "../../../Types/TweetProps";
import { ViewTypeContext, UserContext } from "../../App";
import ProfileImage from "../../ProfileImage";
import "../../style/Tweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import Link from "../../NavBar/Link";

const Tweet: React.FC<TweetProps> = ({
  content,
  userName,
  picture,
  date,
  tweetId,
  like,
}) => {
  const viewType = useContext(ViewTypeContext);
  const user = useContext(UserContext);
  return (
    <div
      className={`tweet ${
        viewType === "all tweets" ? "all-tweets" : "my-tweets"
      }`}
    >
      <div className="d-flex">
        <div className="profile-img-container">
          <ProfileImage pictureUrl={picture} />
        </div>

        <Link isActive={false} pageName={"Profile"} text={userName!} />
        <div className="flex-grow-1"></div>
        <div className="text-secondary">
          {moment(date).format("MMM Mo HH:mm A")}
        </div>
      </div>
      <div>{content}</div>

      <img
        src="./like.svg"
        alt="like"
        className={`like-img ${like ? "like" : ""}`}
        onClick={(e) => {
          e.currentTarget.classList.toggle("like");
          tweetsDB.toggleLike(tweetId!, user!.uid);
        }}
      />
    </div>
  );
};

export default Tweet;
