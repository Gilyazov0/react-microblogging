import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import TextBox from "./TextBox";
import "./style/Form.css";
import { TweetProps } from "../Types/TweetProps";

const Form: React.FC<{ addTweet: (tweet: TweetProps) => void }> = (props: {
  addTweet: (tweet: TweetProps) => void;
}) => {
  const [lengthIsOk, setLengthIsOk] = useState(true);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.getElementsByClassName(
      "tweet-content"
    )[0] as HTMLTextAreaElement;
    const content = input.value;
    input.value = "";

    props.addTweet({
      content,
      date: new Date().toISOString(),
      userName: "user#42",
    });
  };
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
        <Button variant="primary" disabled={!lengthIsOk} type="submit">
          Tweet
        </Button>
      </div>
    </form>
  );
};

export default Form;
