import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import "./style/Home.css";
import NewTweet from "./NewTweet";
import { TweetProps } from "../Types/TweetProps";
import Loading from "./Loading";
import { Alert } from "react-bootstrap";
import TweetList from "./TweetsList";
import tweetsDB from "../lib/tweetsDB";
import { UserContext } from "./App";

export const TweetsContext = createContext<TweetProps[]>([]);

export default function Home() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const addTweet = (tweet: TweetProps) => {
    setTweets((prev) => {
      const data = [...prev];
      data.unshift(tweet);
      return data;
    });
  };

  const getTweets = async () => {
    const date = tweets.length ? tweets[tweets.length - 1].date : Date.now();
    const newTweets = await tweetsDB.getTweets(date);
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

      {isUpdating && <Loading />}
      <TweetList getTweets={getTweets} />
    </TweetsContext.Provider>
  );
}
