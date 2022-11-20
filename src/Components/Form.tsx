import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import TextBox from "./TextBox";
import "./style/Form.css";
const Form: React.FC = () => {
  const [lengthIsOk, setLengthIsOk] = useState(true);

  return (
    <div className="form">
      <TextBox setLengthIsOk={(x: boolean) => setLengthIsOk(x)} />
      <div className="d-flex ">
        {!lengthIsOk && (
          <Alert variant="danger" className="m-0 p-1 ">
            The tweet can't contain more then 140 chars.
          </Alert>
        )}
        <div className="flex-grow-1 "></div>
        <Button variant="primary" disabled={!lengthIsOk}>
          Tweet
        </Button>
      </div>
    </div>
  );
};

export default Form;
