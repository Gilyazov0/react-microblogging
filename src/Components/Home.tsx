import { useState, useEffect, useContext, createContext } from "react";
import "./style/Home.css";
import NewTweet from "./NewTweet";
import { TweetProps } from "../Types/TweetProps";
import { Alert } from "react-bootstrap";
import TweetList from "./TweetsList";
import tweetsDB from "../lib/tweetsDB";
import { UserContext } from "./App";
import userDB from "../lib/usersDB";

export const TweetsContext = createContext<TweetProps[]>([]);

export default function Home() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);

  const addTweet = async (tweet: TweetProps) => {
    await userDB.addUserDataToTweet(tweet);
    setTweets((prev) => {
      const data = [...prev];

      data.unshift(tweet);
      return data;
    });
  };

  const getTweets = async () => {
    const date = tweets.length ? tweets[tweets.length - 1].date : Date.now();
    const newTweets = await tweetsDB.getTweets(date);
    if (newTweets.length === 0) {
      setHasMore(false);
    }
    for (const tweet of newTweets) {
      await userDB.addUserDataToTweet(tweet);
    }
    if (newTweets) setTweets((prevTweets) => [...prevTweets, ...newTweets]);
  };

  const [tweets, setTweets] = useState<TweetProps[]>([]);

  useEffect(() => {
    getTweets();
    const unsubscribe = tweetsDB.subscribeForUpdates(addTweet);
    return () => unsubscribe();
  }, []);

  const user = useContext(UserContext);
  const userName = user
    ? user.displayName
      ? user.displayName
      : user.email!
    : "";

  return (
    <TweetsContext.Provider value={tweets}>
      <NewTweet
        setIsUpdating={setIsUpdating}
        isUpdating={isUpdating}
        setServerError={setServerError}
        userName={userName}
      />
      {serverError && (
        <Alert variant="danger" className="m-0 p-1 ">
          {serverError}
        </Alert>
      )}

      <TweetList getTweets={getTweets} hasMore={hasMore} />
    </TweetsContext.Provider>
  );
}
