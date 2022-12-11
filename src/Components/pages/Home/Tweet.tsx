import { TweetProps } from "../../../Types/TweetProps";
import "../../style/Tweet.css";
import TweetMain from "./TweetMain";
import TweetFooter from "./TweetFooter";
import { useAppSelector } from "../../../hooks/redux";
import Replies from "./Replies";

const Tweet: React.FC<TweetProps> = (props) => {
  const { view } = useAppSelector((state) => state.view);

  return (
    <div
      className={`tweet ${view === "all tweets" ? "all-tweets" : "my-tweets"}`}
    >
      <TweetMain {...props} />
      <TweetFooter {...props} />
      {props.replies && props.replies.length !== 0 && (
        <Replies ids={props.replies!} />
      )}
    </div>
  );
};

export default Tweet;
