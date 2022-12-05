import { useAppSelector } from "../../hooks/redux";
import userDB from "../../lib/usersDB";
import tweetsDB from "../../lib/tweetsDB";
import { useEffect, useState } from "react";
import UserData from "../../Types/userData";
import { TweetProps } from "../../Types/TweetProps";
import Loading from "./Home/Loading";
import UsersList from "./Profile/UsersList";
import TweetList from "./Home/TweetsList";
import Tweet from "./Home/Tweet";
const Search: React.FC = () => {
  const { query, searchAt } = useAppSelector((state) => state.search);

  const [data, setData] = useState<UserData[] | TweetProps[] | null>(null);

  useEffect(() => {
    async function getData() {
      if (!query) return;

      const data =
        searchAt === "tweets"
          ? await tweetsDB.SearchTweets(query)
          : await userDB.SearchUser(query);

      setData(null);
      setData(data);
    }
    getData();
  }, [query, searchAt]);
  return (
    <>
      {!data && <Loading />}
      {data && searchAt === "users" && (
        <UsersList title="" uids={(data as UserData[]).map((u) => u.uid)} />
      )}
      {data &&
        searchAt === "tweets" &&
        (data as TweetProps[]).map((tweet: TweetProps) => {
          return <Tweet {...tweet} key={tweet.id} />;
        })}
    </>
  );
};

export default Search;
