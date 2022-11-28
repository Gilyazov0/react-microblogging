import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TweetProps } from "../Types/TweetProps";
import { TweetsContext } from "./Home";
import Tweet from "./Tweet";

const TweetList: React.FC<{ getTweets: Function }> = (props) => {
  const tweets = useContext(TweetsContext);

  const tweetComponents = tweets.map((tweet: TweetProps, index) => {
    return (
      <Tweet
        content={tweet.content}
        date={tweet.date}
        userName={tweet.userName}
        key={index}
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
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {tweetComponents}
      </InfiniteScroll>
    </div>
  );
};

export default TweetList;
