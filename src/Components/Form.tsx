import React, { useCallback, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import TextBox from "./TextBox";
import "./style/Form.css";
import API from "../lib/serverApi";
interface FormProps {
  setIsUpdating: Function;
  setIsNeedGetTweets: Function;
  setServerError: Function;
  isUpdating: boolean;
}

const Form: React.FC<FormProps> = (props: FormProps) => {
  const [lengthIsOk, setLengthIsOk] = useState(true);

  const handleClick = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      props.setIsUpdating(true);
      props.setServerError("");
      e.preventDefault();
      const input = e.currentTarget.getElementsByClassName(
        "tweet-content"
      )[0] as HTMLTextAreaElement;
      const content = input.value;
      input.value = "";

      const response = await API.postTweet({
        content: content,
        userName: "Sergey",
        date: new Date().toISOString(),
      });
      if (response.error) {
        props.setServerError(response.message);
        props.setIsUpdating(false);
      } else props.setIsNeedGetTweets(true);
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

export default Form;
