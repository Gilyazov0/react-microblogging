import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import userDB from "../../../lib/usersDB";
import { userSlice } from "../../../store/reducers/UserSlice";

const FollowIcon: React.FC<{ authorId: string }> = ({ authorId }) => {
  const user = useAppSelector((state) => state.user.user);
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  async function handleClick(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) {
    e.currentTarget.classList.toggle("selected");
    await userDB.toggleFollow(authorId, user!.uid);
    const newUserData = await userDB.getUserData(user!.uid);
    dispatch(setUser(newUserData));
  }
  return (
    <img
      src="./follow.svg"
      alt="follow"
      className={`icon-img ${
        user?.follow?.includes(authorId) ? "selected" : ""
      }`}
      onClick={handleClick}
    />
  );
};

export default FollowIcon;
