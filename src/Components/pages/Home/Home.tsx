import { useEffect } from "react";
import "../../style/Home.css";
import NewTweet from "./NewTweet";
import { TweetProps } from "../../../Types/TweetProps";
import TweetList from "./TweetsList";
import tweetsDB from "../../../lib/tweetsDB";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { getTweets } from "../../../store/reducers/TweetSlice";
import { tweetSlice } from "../../../store/reducers/TweetSlice";

export default function Home() {
  const { view } = useAppSelector((state) => state.view);
  const { user } = useAppSelector((state) => state.user);

  const { isLoading } = useAppSelector((state) => state.tweet);
  const { setHasMore, addTweet } = tweetSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(
    function reset() {
      if (!isLoading) dispatch(getTweets());
      dispatch(setHasMore(true));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [view, user]
  );

  useEffect(() => {
    const unsubscribe = tweetsDB.subscribeForUpdates((tweet: TweetProps) =>
      dispatch(addTweet(tweet))
    );
    return () => {
      unsubscribe();
    };
  }, [addTweet, dispatch]);

  return (
    <>
      <NewTweet />
      <TweetList />
    </>
  );
}
