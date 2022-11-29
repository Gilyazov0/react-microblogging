import { useState, useEffect, useContext, createContext } from "react";
import "../../style/Home.css";
import NewTweet from "./NewTweet";
import { TweetProps } from "../../../Types/TweetProps";
import { Alert } from "react-bootstrap";
import TweetList from "./TweetsList";
import tweetsDB from "../../../lib/tweetsDB";
import userDB from "../../../lib/usersDB";
import { UserContext, ViewTypeContext } from "../../App";

export const TweetsContext = createContext<TweetProps[]>([]);
export default function Home() {
  const [serverError, setServerError] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [tweets, setTweets] = useState<TweetProps[]>([]);
  const [updating, setUpdating] = useState<boolean>(false);

  const viewType = useContext(ViewTypeContext);
  const user = useContext(UserContext);

  const addTweet = async (tweet: TweetProps) => {
    await userDB.addUserDataToTweet(tweet);
    setTweets((prev) => {
      const data = [...prev];

      data.unshift(tweet);
      return data;
    });
  };

  const getTweets = async () => {
    if (updating) return;

    setUpdating(true);
    const date = tweets.length ? tweets[tweets.length - 1].date : Date.now();
    const uid = viewType === "all tweets" ? "" : user?.uid;
    const newTweets = await tweetsDB.getTweets(date, uid);
    if (newTweets.length === 0) {
      setHasMore(false);
    }
    for (const tweet of newTweets) {
      await userDB.addUserDataToTweet(tweet);
    }
    if (newTweets) setTweets((prevTweets) => [...prevTweets, ...newTweets]);
    setUpdating(false);
  };

  useEffect(() => {
    setTweets([]);
    setHasMore(true);
  }, [viewType]);

  useEffect(() => {
    getTweets();
    const unsubscribe = tweetsDB.subscribeForUpdates(addTweet);
    return () => unsubscribe();
  }, []);

  if (tweets.length === 0) getTweets();

  return (
    <TweetsContext.Provider value={tweets}>
      <NewTweet setServerError={setServerError} />
      {serverError && (
        <Alert variant="danger" className="m-0 p-1 ">
          {serverError}
        </Alert>
      )}

      <TweetList getTweets={getTweets} hasMore={hasMore} />
    </TweetsContext.Provider>
  );
}
