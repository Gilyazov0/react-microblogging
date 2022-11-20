import { useState } from "react";
import "./style/App.css";
import Form from "./Form";
import Tweet from "./Tweet";

function App() {
  const [tweets, setTweets] = useState([]);
  return (
    <div className="app">
      <Form />
      <Tweet
        content="sadasd  asd asd as dsa "
        date="this is a date"
        userName="yonatan"
      />
    </div>
  );
}

export default App;
