import "../../style/Home.css";
import NewTweet from "./NewTweet";
import TweetList from "./TweetsList";
import useResetTweets from "../../../hooks/useResetTweets";
import useSubscribe from "../../../hooks/useSubscribe";
import useUnsignedRedirect from "../../../hooks/useUnsignedRedirect";

export default function Home() {
  useResetTweets();
  useSubscribe();
  useUnsignedRedirect();
  return (
    <>
      <NewTweet replyTo="" />
      <TweetList />
    </>
  );
}
