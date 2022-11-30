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
  const [lastTweetDate, setLastTweetDate] = useState<number>(Date.now());

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
    if (updating || !user) return;

    setUpdating(true);

    const getAllTweets = viewType === "all tweets" ? true : false;
    const newTweets = await tweetsDB.getTweets(
      lastTweetDate,
      user?.uid,
      getAllTweets
    );
    if (newTweets.length === 0) {
      setHasMore(false);
    } else {
      for (const tweet of newTweets) {
        await userDB.addUserDataToTweet(tweet);
      }

      setTweets((prevTweets) => [...prevTweets, ...newTweets]);
      const date = newTweets.length
        ? newTweets[newTweets.length - 1].date
        : Date.now();

      setLastTweetDate(date);
    }
    setUpdating(false);
  };

  useEffect(() => {
    setTweets([]);
    setLastTweetDate(Date.now());
    setHasMore(true);
  }, [viewType]);

  useEffect(() => {
    if (!user) return;
    getTweets();
    const unsubscribe = tweetsDB.subscribeForUpdates(addTweet);
    return () => {
      unsubscribe();
      setTweets([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (hasMore) getTweets();
  }, [hasMore]);

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
