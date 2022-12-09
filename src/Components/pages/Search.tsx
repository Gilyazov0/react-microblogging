import { useAppSelector } from "../../hooks/redux";
import userDB from "../../lib/usersDB";
import tweetsDB from "../../lib/tweetsDB";
import { useEffect, useState } from "react";
import UserData from "../../Types/userData";
import { TweetProps } from "../../Types/TweetProps";
import Loading from "../BaseComponents/Loading";
import UsersList from "./Profile/UsersList";
import Tweet from "./Home/Tweet";
import useUnsignedRedirect from "../../hooks/useUnsignedRedirect";

const Search: React.FC = () => {
  const { query, searchAt } = useAppSelector((state) => state.search);
  const [data, setData] = useState<UserData[] | TweetProps[] | null>(null);

  useUnsignedRedirect();

  useEffect(() => {
    async function getData() {
      if (!query) {
        if (!data) setData([]);
        return;
      }

      const newData =
        searchAt === "tweets"
          ? await tweetsDB.SearchTweets(query)
          : await userDB.SearchUser(query);

      setData(newData);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchAt]);

  return (
    <>
      {!data && <Loading />}
      {data && data.length === 0 && (
        <h1 className="text-white mt-5">
          {query ? "Nothing have been found" : "So, what we are searching for?"}
        </h1>
      )}
      {data && searchAt === "users" && (
        <UsersList title="" uids={(data as UserData[]).map((u) => u.uid)} />
      )}
      {data &&
        searchAt === "tweets" &&
        (data as []).map((tweet: TweetProps) => {
          return <Tweet {...tweet} key={tweet.id} />;
        })}
    </>
  );
};

export default Search;
