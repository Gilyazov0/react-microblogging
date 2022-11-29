import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TweetProps } from "../../../Types/TweetProps";
import { TweetsContext } from "./Home";
import Loading from "./Loading";
import Tweet from "./Tweet";

const TweetList: React.FC<{ getTweets: Function; hasMore: boolean }> = (
  props
) => {
  const tweets = useContext(TweetsContext);

  const tweetComponents = tweets.map((tweet: TweetProps, index) => {
    return (
      <Tweet
        content={tweet.content}
        date={tweet.date}
        userName={tweet.userName}
        userId={tweet.userId}
        picture={tweet.picture}
        key={tweet.tweetId}
      />
    );
  });

  function next() {
    props.getTweets();
  }
  return (
    <div className="tweets-list">
      <InfiniteScroll
        dataLength={tweets.length}
        next={next}
        hasMore={props.hasMore}
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
