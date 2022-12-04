import { useCallback, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import TextBox from "./TextBox";
import "../../style/NewTweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import { useAppSelector } from "../../../hooks/redux";

const NewTweet: React.FC = () => {
  const [tweetLength, setTweetLength] = useState(0);
  const [serverError, setServerError] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);

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
    [setServerError, user]
  );

  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          handleClick(e);
        }}
      >
        <TextBox setTweetLength={(x: number) => setTweetLength(x)} />
        <div className="d-flex ">
          {tweetLength > 140 && (
            <div className="text-danger">
              The tweet can't contain more then 140 chars.
            </div>
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
      {serverError && (
        <Alert variant="danger" className="m-0 p-1 ">
          {serverError}
        </Alert>
      )}
    </>
  );
};

export default NewTweet;
