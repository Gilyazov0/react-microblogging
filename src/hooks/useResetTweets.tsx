import { useEffect } from "react";
import { getTweets, tweetSlice } from "../store/reducers/TweetSlice";
import { useAppDispatch, useAppSelector } from "./redux";

const useResetTweets = () => {
  const { view } = useAppSelector((state) => state.view);
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.tweet);
  const { setHasMore } = tweetSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(
    function reset() {
      if (!isLoading) dispatch(getTweets());
      dispatch(setHasMore(true));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [view, user]
  );
};

export default useResetTweets;
