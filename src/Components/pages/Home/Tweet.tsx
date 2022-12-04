import moment from "moment";
import { TweetProps } from "../../../Types/TweetProps";
import ProfileImage from "../../ProfileImage";
import "../../style/Tweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import Link from "../../NavBar/Link";
import { useAppSelector } from "../../../hooks/redux";

const Tweet: React.FC<TweetProps> = ({
  content,
  userName,
  picture,
  date,
  tweetId,
  like,
}) => {
  const { view } = useAppSelector((state) => state.view);
  const { user } = useAppSelector((state) => state.user);
  console.log("rendering");
  return (
    <div
      className={`tweet ${view === "all tweets" ? "all-tweets" : "my-tweets"}`}
    >
      <div className="d-flex">
        <div className="profile-img-container">
          <ProfileImage pictureUrl={picture} />
        </div>

        <Link pageName={"Profile"} text={userName!} />
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
