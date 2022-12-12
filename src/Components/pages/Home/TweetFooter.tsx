import { TweetProps } from "../../../Types/TweetProps";
import "../../style/TweetFooter.css";
import tweetsDB from "../../../lib/tweetsDB";
import { useAppSelector } from "../../../hooks/redux";
import FollowIcon from "./FollowIcon";
import Reply from "./Reply";
import { useContext } from "react";
import { ReplyContext } from "./Home";

const TweetFooter: React.FC<TweetProps> = (props) => {
  const { id, like, userId, replies } = { ...props };

  const { user } = useAppSelector((state) => state.user);
  const { replyId, setReplyId } = useContext(ReplyContext);
  return (
    <>
      <div className="img-container">
        <img
          src="./like.svg"
          alt="like"
          className={`icon-img ${like ? "selected" : ""}`}
          onClick={(e) => {
            e.currentTarget.classList.toggle("selected");
            tweetsDB.toggleLike(id!, user!.uid);
          }}
        />
        {userId !== user?.uid && <FollowIcon authorId={userId} />}
        <span className="replies-number">{replies?.length}</span>
        <img
          className={`icon-img`}
          src="./reply.png"
          alt="reply"
          onClick={() => setReplyId(id)}
        />
      </div>
      <Reply
        show={id === replyId}
        setShow={() => setReplyId("")}
        tweet={props}
      />
    </>
  );
};

export default TweetFooter;
