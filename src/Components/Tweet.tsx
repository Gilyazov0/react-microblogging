import React from "react";
import { TweetProps } from "../Types/TweetProps";
import "./style/Tweet.css";

const Tweet: React.FC<TweetProps> = (props: TweetProps) => {
  return (
    <div className="tweet">
      <div className="d-flex">
        <div className="text-secondary">{props.userName}</div>
        <div className="flex-grow-1"></div>
        <div className="text-secondary">{props.date}</div>
      </div>
      <div>{props.content}</div>
    </div>
  );
};

export default Tweet;
