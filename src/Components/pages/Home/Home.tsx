import { useEffect } from "react";
import "../../style/Home.css";
import NewTweet from "./NewTweet";
import TweetList from "./TweetsList";
import { useAppSelector } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import useResetTweets from "../../../hooks/useResetTweets";
import useSubscribe from "../../../hooks/useSubscribe";

export default function Home() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useResetTweets();
  useSubscribe();

  useEffect(() => {
    if (!user) navigate("/signIn");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <NewTweet />
      <TweetList />
    </>
  );
}
