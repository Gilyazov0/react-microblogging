import { useState, useEffect } from "react";
import tweetsDB from "../lib/tweetsDB";
import userDB from "../lib/usersDB";
import { TweetProps } from "../Types/TweetProps";
import UserData from "../Types/userData";
import { useAppSelector } from "./redux";

export default function useSearch() {
  const { query, searchAt } = useAppSelector((state) => state.search);
  const [data, setData] = useState<UserData[] | TweetProps[] | null>(null);

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

  return { data, query, searchAt };
}
