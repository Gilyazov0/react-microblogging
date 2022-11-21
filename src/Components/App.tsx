import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import "./style/App.css";
import Form from "./Form";
import Tweet from "./Tweet";
import { TweetProps } from "../Types/TweetProps";
import ErrorBoundary from "./ErrorBoundary";
import moment from "moment";
export default function App() {
  const [tweets, setTweets] = useLocalStorageState<TweetProps[]>("tweetApp", {
    defaultValue: [],
  });

  tweets.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

  function addTweet(tweet: TweetProps) {
    setTweets((prevState) => {
      const newState = [...prevState];
      newState.push(tweet);
      return newState;
    });
  }

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
        <Form addTweet={addTweet} />
        {tweetComponents}
      </div>
    </ErrorBoundary>
  );
}
