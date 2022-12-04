import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import userDB from "../../../lib/usersDB";
import { userSlice } from "../../../store/reducers/UserSlice";

const FollowIcon: React.FC<{ authorId: string }> = ({ authorId }) => {
  const { follow, uid } = useAppSelector((state) => state.user.user!);
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  async function handleClick(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) {
    e.currentTarget.classList.toggle("selected");
    await userDB.toggleFollow(authorId, uid);
    const newUserData = await userDB.getUserData(uid);
    dispatch(setUser(newUserData));
  }
  console.log("render");
  return (
    <img
      src="./follow.svg"
      alt="follow"
      className={`icon-img ${follow?.includes(authorId) ? "selected" : ""}`}
      onClick={handleClick}
    />
  );
};

export default FollowIcon;
