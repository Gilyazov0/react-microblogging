import { useState, useEffect } from "react";
import { TweetProps } from "../../../Types/TweetProps";
import Loading from "../../BaseComponents/Loading";
import tweetsDB from "../../../lib/tweetsDB";
import Tweet from "./Tweet";

const Replies: React.FC<{ ids: string[] }> = ({ ids }) => {
  const [tweets, setTweets] = useState<TweetProps[]>([]);
  useEffect(() => {
    async function getTweetsById(ids: string[]) {
      const newTweets = await tweetsDB.getTweets(
        Date.now(),
        undefined,
        "by id",
        ids
      );
      setTweets(newTweets);
    }
    if (ids?.length > 0) getTweetsById(ids);
  }, [ids]);

  const tweetComponents = tweets.map((tweet) => (
    <Tweet {...tweet} key={tweet.id} />
  ));

  return <>{tweets.length === 0 ? <Loading /> : tweetComponents}</>;
};

export default Replies;
