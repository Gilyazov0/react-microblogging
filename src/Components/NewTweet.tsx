import React, { useCallback, useContext, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import TextBox from "./TextBox";
import "./style/NewTweet.css";
import API from "../lib/serverApi";
import { TweetsContext } from "./Home";
import db from "../lib/dbApi";

interface Props {
  setIsUpdating: Function;
  setServerError: Function;
  isUpdating: boolean;
  userName: string;
}

const NewTweet: React.FC<Props> = (props: Props) => {
  const [lengthIsOk, setLengthIsOk] = useState(true);
  const tweets = useContext(TweetsContext);

  const handleClick = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const { setIsUpdating, setServerError } = {
        ...props,
      };
      // setIsUpdating(true);
      setServerError("");
      e.preventDefault();
      const input = e.currentTarget.getElementsByClassName(
        "tweet-content"
      )[0] as HTMLTextAreaElement;
      const content = input.value;
      input.value = "";

      const tweet = {
        content: content,
        userName: props.userName,
        date: new Date().toISOString(),
      };
      try {
        await db.postTweet(tweet);
        tweets.addTweet(tweet);
      } catch (e: any) {
        setServerError("server error:" + e?.message);
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleClick(e);
      }}
    >
      <TextBox setLengthIsOk={(x: boolean) => setLengthIsOk(x)} />
      <div className="d-flex ">
        {!lengthIsOk && (
          <Alert variant="danger" className="m-0 p-1 ">
            The tweet can't contain more then 140 chars.
          </Alert>
        )}
        <div className="flex-grow-1 "></div>
        <Button
          variant="primary"
          disabled={!lengthIsOk || props.isUpdating}
          type="submit"
        >
          Tweet
        </Button>
      </div>
    </form>
  );
};

export default NewTweet;
