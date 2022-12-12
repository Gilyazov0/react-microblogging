import "../../style/Home.css";
import NewTweet from "./NewTweet";
import TweetList from "./TweetsList";
import useResetTweets from "../../../hooks/useResetTweets";
import useSubscribe from "../../../hooks/useSubscribe";
import useUnsignedRedirect from "../../../hooks/useUnsignedRedirect";
import { useState, createContext } from "react";

export const ReplyContext = createContext<{
  replyId: string;
  setReplyId: Function;
}>({ replyId: "", setReplyId: () => {} });

export default function Home() {
  const [replyId, setReplyId] = useState<string>("");

  useResetTweets();
  useSubscribe();
  useUnsignedRedirect();
  return (
    <ReplyContext.Provider value={{ replyId, setReplyId }}>
      <NewTweet replyTo="" />
      <TweetList />
    </ReplyContext.Provider>
  );
}
