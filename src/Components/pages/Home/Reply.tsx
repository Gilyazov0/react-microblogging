import Modal from "react-bootstrap/Modal";
import NewTweet from "./NewTweet";
import { TweetProps } from "../../../Types/TweetProps";
import TweetMain from "./TweetMain";
import "../../style/Reply.css";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  tweet: TweetProps;
}
const Reply: React.FC<Props> = ({ show, setShow, tweet }) => {
  const handleClose = () => setShow(false);
  const { view } = useAppSelector((state) => state.view);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div
          className={`tweet ${
            view === "all tweets" ? "all-tweets" : "my-tweets"
          }`}
        >
          <TweetMain {...tweet} />
        </div>
        <NewTweet replyTo={tweet.id!} />
      </Modal.Body>
    </Modal>
  );
};

export default Reply;
