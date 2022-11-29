import moment from "moment";
import { TweetProps } from "../../../Types/TweetProps";
import ProfileImage from "../../ProfileImage";
import "../../style/Tweet.css";

const Tweet: React.FC<TweetProps> = ({ content, userName, picture, date }) => {
  return (
    <div className="tweet">
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
