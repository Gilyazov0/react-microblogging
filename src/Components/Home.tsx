import React, { useState, useEffect } from "react";
import "./style/Home.css";
import Form from "./Form";
import Tweet from "./Tweet";
import { TweetProps } from "../Types/TweetProps";
import moment from "moment";
import API from "../lib/serverApi";
import Loading from "./Loading";
import { Alert } from "react-bootstrap";
import TweetList from "./TeetsList";

export const TweetsContext = React.createContext<TweetProps[]>([]);

export default function Home(props: { user: string }) {
  const [tweets, setTweets] = useState<TweetProps[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isNeedGetTweets, setIsNeedGetTweets] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  // getting tweets from server
  useEffect(() => {
    setIsUpdating(true);
    (async () => {
      const tweets = await API.getTweets();
      if (tweets) {
        setTweets(tweets);
      }
      setIsNeedGetTweets(false);
      setIsUpdating(false);
    })();
  }, []);

  tweets.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

  return (
    <TweetsContext.Provider value={tweets}>
      <div className="app">
        <Form
          setIsUpdating={setIsUpdating}
          setIsNeedGetTweets={setIsNeedGetTweets}
          isUpdating={isUpdating}
          setServerError={setServerError}
          userName={props.user}
        />
        {serverError && (
          <Alert variant="danger" className="m-0 p-1 ">
            {serverError}
          </Alert>
        )}

        {isUpdating && <Loading />}
        <TweetList />
      </div>
    </TweetsContext.Provider>
  );
}
