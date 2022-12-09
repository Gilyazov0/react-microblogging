import { TweetProps } from "../../../Types/TweetProps";
import "../../style/Tweet.css";
import TweetMain from "./TweetMain";
import TweetFooter from "./TweetFooter";
import { useAppSelector } from "../../../hooks/redux";

const Tweet: React.FC<TweetProps> = (props) => {
  const { view } = useAppSelector((state) => state.view);

  return (
    <div
      className={`tweet ${view === "all tweets" ? "all-tweets" : "my-tweets"}`}
    >
      <TweetMain {...props} />
      <TweetFooter {...props} />
    </div>
  );
};

export default Tweet;
