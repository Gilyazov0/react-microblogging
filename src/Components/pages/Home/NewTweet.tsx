import { useCallback, useContext, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import TextBox from "./TextBox";
import "../../style/NewTweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import { UserContext } from "../../App";

const NewTweet: React.FC<{ setServerError: Function }> = ({
  setServerError,
}) => {
  const [tweetLength, setTweetLength] = useState(0);
  const user = useContext(UserContext);

  const handleClick = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setServerError("");
      setTweetLength(0);
      e.preventDefault();
      const input = e.currentTarget.firstChild as HTMLTextAreaElement;
      const content = input.value;
      input.value = "";
      input.focus();

      const tweet = {
        content: content,
        userId: user!.uid,
        date: Date.now(),
      };
      try {
        await tweetsDB.postTweet(tweet);
      } catch (e: any) {
        setServerError("server error:" + e?.message);
      }
    },
    [user]
  );

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleClick(e);
      }}
    >
      <TextBox setTweetLength={(x: number) => setTweetLength(x)} />
      <div className="d-flex ">
        {tweetLength > 140 && (
          <Alert variant="danger" className="m-0">
            The tweet can't contain more then 140 chars.
          </Alert>
        )}
        <div className="flex-grow-1 "></div>
        <Button
          variant="primary"
          disabled={tweetLength < 1 || tweetLength > 140}
          type="submit"
        >
          Tweet
        </Button>
      </div>
    </form>
  );
};

export default NewTweet;
