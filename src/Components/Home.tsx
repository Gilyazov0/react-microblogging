import React, { useState, useEffect, useContext } from "react";
import "./style/Home.css";
import NewTweet from "./NewTweet";
import { TweetProps } from "../Types/TweetProps";
import Loading from "./Loading";
import { Alert } from "react-bootstrap";
import TweetList from "./TweetsList";
import db from "../lib/DB";
import { UserContext } from "./App";

interface TweetsContextProps {
  tweetsData: TweetProps[];
  addTweet: (tweet: TweetProps) => void;
}

export const TweetsContext = React.createContext<TweetsContextProps>({
  tweetsData: [],
  addTweet: () => {},
});

export default function Home() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const addTweet = (tweet: TweetProps) => {
    setTweets((prev) => {
      const data = [...prev.tweetsData];
      data.unshift(tweet);
      return { ...prev, tweetsData: data };
    });
  };
  const [tweets, setTweets] = useState<TweetsContextProps>({
    tweetsData: [],
    addTweet,
  });

  // getting tweets from server
  useEffect(() => {
    const getTweets = async () => {
      setIsUpdating(true);
      const newTweets = await db.getTweets();
      if (newTweets) setTweets({ tweetsData: newTweets, addTweet: addTweet });

      setIsUpdating(false);
    };
    getTweets();
    const interval = setInterval(getTweets, 30000);
    return () => clearInterval(interval);
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
      <TweetList />
    </TweetsContext.Provider>
  );
}
