import { useEffect } from "react";
import tweetsDB from "../lib/tweetsDB";
import { tweetSlice } from "../store/reducers/TweetSlice";
import { TweetProps } from "../Types/TweetProps";
import { useAppDispatch } from "./redux";

export default function useSubscribe() {
  const { addTweet } = tweetSlice.actions;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = tweetsDB.subscribeForUpdates((tweet: TweetProps) =>
      dispatch(addTweet(tweet))
    );
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
