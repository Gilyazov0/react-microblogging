import { useState, useEffect, useCallback } from "react";
import "./style/App.css";
import Form from "./Form";
import Tweet from "./Tweet";
import { TweetProps } from "../Types/TweetProps";
import ErrorBoundary from "./ErrorBoundary";
import moment from "moment";
import API from "../lib/serverApi";
import Loading from "./Loading";
import { Alert } from "react-bootstrap";

export default function App() {
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
  }, [isNeedGetTweets]);

  tweets.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

  const tweetComponents = tweets.map((tweet: TweetProps, index) => {
    return (
      <Tweet
        content={tweet.content}
        date={tweet.date}
        userName={tweet.userName}
        key={index}
      />
    );
  });
  return (
    <ErrorBoundary>
      <div className="app">
        <Form
          setIsUpdating={setIsUpdating}
          setIsNeedGetTweets={setIsNeedGetTweets}
          isUpdating={isUpdating}
          setServerError={setServerError}
        />
        {serverError && (
          <Alert variant="danger" className="m-0 p-1 ">
            {serverError}
          </Alert>
        )}

        {isUpdating && <Loading />}
        {tweetComponents}
      </div>
    </ErrorBoundary>
  );
}
