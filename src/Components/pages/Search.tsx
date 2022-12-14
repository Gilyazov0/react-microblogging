import UserData from "../../Types/userData";
import { TweetProps } from "../../Types/TweetProps";
import Loading from "../BaseComponents/Loading";
import UsersList from "./Profile/UsersList";
import Tweet from "./Home/Tweet";
import useSearch from "../../hooks/useSearch";
import useUnsignedRedirect from "../../hooks/useUnsignedRedirect";
import "../style/Search.css";

const Search: React.FC = () => {
  useUnsignedRedirect();
  const { data, query, searchAt } = useSearch();

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
      {data && searchAt === "tweets" && (
        <div className="tweets-list">
          {(data as []).map((tweet: TweetProps) => {
            return <Tweet {...tweet} key={tweet.id} />;
          })}
        </div>
      )}
    </>
  );
};

export default Search;
