import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TweetProps } from "../../../Types/TweetProps";
import { TweetsContext } from "./Home";
import Loading from "./Loading";
import Tweet from "./Tweet";

const TweetList: React.FC<{ getTweets: Function; hasMore: boolean }> = ({
  getTweets,
  hasMore,
}) => {
  const tweets = useContext(TweetsContext);

  const tweetComponents = tweets.map((tweet: TweetProps, index) => {
    return <Tweet {...tweet} key={tweet.tweetId} />;
  });

  function next() {
    getTweets();
  }
  return (
    <div className="tweets-list">
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
