import { TweetProps } from "../../../Types/TweetProps";
import "../../style/Tweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import { useAppSelector } from "../../../hooks/redux";
import FollowIcon from "./FollowIcon";
import Reply from "./Reply";
import { useState } from "react";

const TweetFooter: React.FC<TweetProps> = (props) => {
  const { id, like, userId } = { ...props };
  const [show, setShow] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

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
        <img
          className={`icon-img`}
          src="./reply.png"
          alt="reply"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>
      <Reply show={show} setShow={setShow} tweet={props} />
    </>
  );
};

export default TweetFooter;
