import { useContext, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import TextBox from "./TextBox";
import "../../style/NewTweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import { useAppSelector } from "../../../hooks/redux";
import { ReplyContext } from "./Home";

const NewTweet: React.FC<{ replyTo: string }> = ({ replyTo = "" }) => {
  const [text, setText] = useState("");
  const [serverError, setServerError] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);
  const { setReplyId } = useContext(ReplyContext);

  const handleClick = async function () {
    setServerError("");
    setText("");

    const tweet = {
      content: text,
      userId: user!.uid,
      date: Date.now(),
      replyTo: replyTo,
      replies: [],
    };
    try {
      await tweetsDB.postTweet(tweet);
      setReplyId("");
    } catch (e: any) {
      setServerError("server error:" + e?.message);
    }
  };
  return (
    <>
      <div className="new-tweet">
        <TextBox setText={setText} text={text} />
        <div className="d-flex ">
          {text.length > 140 && (
            <div className="text-danger">
              The tweet can't contain more then 140 chars.
            </div>
          )}
          <div className="flex-grow-1 "></div>
          <Button
            variant="primary"
            disabled={text.length < 1 || text.length > 140}
            onClick={handleClick}
          >
            Tweet
          </Button>
        </div>
      </div>
      {serverError && (
        <Alert variant="danger" className="m-0 p-1 ">
          {serverError}
        </Alert>
      )}
    </>
  );
};

export default NewTweet;
