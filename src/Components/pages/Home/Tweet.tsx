import moment from "moment";
import { useContext } from "react";
import { TweetProps } from "../../../Types/TweetProps";
import { ViewTypeContext } from "../../App";
import ProfileImage from "../../ProfileImage";
import "../../style/Tweet.css";

const Tweet: React.FC<TweetProps> = ({ content, userName, picture, date }) => {
  const viewType = useContext(ViewTypeContext);
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
    </div>
  );
};

export default Tweet;
