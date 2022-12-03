import InfiniteScroll from "react-infinite-scroll-component";
import { TweetProps } from "../../../Types/TweetProps";
import Loading from "./Loading";
import Tweet from "./Tweet";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { getTweets } from "../../../store/reducers/TweetSlice";

const TweetList: React.FC = () => {
  const { tweets } = useAppSelector((state) => state.tweet);

  const { hasMore } = useAppSelector((state) => state.tweet);
  const dispatch = useAppDispatch();

  const tweetComponents = tweets.map((tweet: TweetProps, index) => {
    return <Tweet {...tweet} key={tweet.tweetId} />;
  });

  function next() {
    dispatch(getTweets());
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={tweets.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        }
        endMessage={
          <p className="text-light text-center">Yay! You have seen it all</p>
        }
      >
        {tweetComponents}
      </InfiniteScroll>
    </div>
  );
};

export default TweetList;
