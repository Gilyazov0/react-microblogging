import moment from "moment";
import { TweetProps } from "../Types/TweetProps";
import ProfileImage from "./ProfileImage";
import "./style/Tweet.css";

const Tweet: React.FC<TweetProps> = (props: TweetProps) => {
  console.log(props.picture);
  return (
    <div className="tweet">
      <div className="d-flex">
        <ProfileImage pictureUrl={props.picture} />
        <div className="text-secondary">{props.userName}</div>
        <div className="flex-grow-1"></div>
        <div className="text-secondary">
          {moment(props.date).format("MMM Mo HH:mm A")}
        </div>
      </div>
      <div>{props.content}</div>
    </div>
  );
};

export default Tweet;
