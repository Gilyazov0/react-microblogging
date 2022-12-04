import moment from "moment";
import { TweetProps } from "../../../Types/TweetProps";
import ProfileImage from "../../ProfileImage";
import "../../style/Tweet.css";
import tweetsDB from "../../../lib/tweetsDB";
import Link from "../../NavBar/Link";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { profileSlice } from "../../../store/reducers/ProfileSlice";

const Tweet: React.FC<TweetProps> = ({
  content,
  userName,
  picture,
  date,
  id,
  like,
  userId,
}) => {
  const { view } = useAppSelector((state) => state.view);
  const { user } = useAppSelector((state) => state.user);
  const { setProfileUid } = profileSlice.actions;

  const dispatch = useAppDispatch();
  return (
    <div
      className={`tweet ${view === "all tweets" ? "all-tweets" : "my-tweets"}`}
    >
      <div className="d-flex">
        <div className="profile-img-container">
          <ProfileImage pictureUrl={picture} />
        </div>

        <Link
          pageName={"Profile"}
          text={userName!}
          onClickExtra={() => dispatch(setProfileUid(userId))}
        />
        <div className="flex-grow-1"></div>
        <div className="text-secondary">
          {moment(date).format("MMM Mo HH:mm A")}
        </div>
      </div>
      <div>{content}</div>
      <div className="img-container">
        <img
          src="./follow.svg"
          alt="follow"
          className={`icon-img ${like ? "selected" : ""}`}
          onClick={(e) => {
            e.currentTarget.classList.toggle("selected");
            tweetsDB.toggleLike(id!, user!.uid);
          }}
        />
        <img
          src="./like.svg"
          alt="like"
          className={`icon-img ${like ? "selected" : ""}`}
          onClick={(e) => {
            e.currentTarget.classList.toggle("like");
            tweetsDB.toggleLike(id!, user!.uid);
          }}
        />
      </div>
    </div>
  );
};

export default Tweet;
