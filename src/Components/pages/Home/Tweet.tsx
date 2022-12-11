import { TweetProps } from "../../../Types/TweetProps";
import "../../style/Tweet.css";
import TweetMain from "./TweetMain";
import TweetFooter from "./TweetFooter";
import { useAppSelector } from "../../../hooks/redux";
import Replies from "./Replies";
import { useState } from "react";

const Tweet: React.FC<TweetProps> = (props) => {
  const { view } = useAppSelector((state) => state.view);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  return (
    <>
      <div
        className={`tweet ${
          view === "all tweets" ? "all-tweets" : "my-tweets"
        }`}
        onClick={() => setShowReplies((prev) => !prev)}
      >
        <TweetMain {...props} />
        <TweetFooter {...props} />
      </div>
      {showReplies && props.replies && props.replies.length !== 0 && (
        <div className="replies">
          <Replies ids={props.replies!} />
        </div>
      )}
    </>
  );
};

export default Tweet;
