import moment from "moment";
import { useContext } from "react";
import { TweetProps } from "../../../Types/TweetProps";
import { ViewTypeContext, UserContext } from "../../App";
import ProfileImage from "../../ProfileImage";
import "../../style/Tweet.css";
import tweetsDB from "../../../lib/tweetsDB";

const Tweet: React.FC<TweetProps> = ({
  content,
  userName,
  picture,
  date,
  tweetId,
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
        <ProfileImage pictureUrl={picture} />
        <div className="text-secondary">{userName}</div>
        <div className="flex-grow-1"></div>
        <div className="text-secondary">
          {moment(date).format("MMM Mo HH:mm A")}
        </div>
      </div>
      <div>{content}</div>
      <img
        src="./like.svg"
        alt="like"
        className="align-self-end"
        onClick={(e) => {
          e.currentTarget.classList.toggle("like");
          tweetsDB.toggleLike(tweetId!, user!.uid);
        }}
      />
    </div>
  );
};

export default Tweet;
