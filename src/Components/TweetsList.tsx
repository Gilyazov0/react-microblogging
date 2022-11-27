import { useContext } from "react";
import { TweetProps } from "../Types/TweetProps";
import { TweetsContext } from "./Home";
import Tweet from "./Tweet";

const TweetList: React.FC = () => {
  const tweets = useContext(TweetsContext);
  const tweetComponents = tweets.tweetsData.map((tweet: TweetProps, index) => {
    return (
      <Tweet
        content={tweet.content}
        date={tweet.date}
        userName={tweet.userName}
        key={index}
      />
    );
  });

  return <div className="tweets-list">{tweetComponents}</div>;
};

export default TweetList;
