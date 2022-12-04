import UserListItem from "./UserListItem";
const UsersList: React.FC<{ uids: string[] | undefined; title: string }> = ({
  uids,
  title,
}) => {
  const users = uids?.map((uid) => <UserListItem key={uid} uid={uid} />);
  return (
    <>
      <h3 className="mt-5">{title}</h3>
      {users}
    </>
  );
};

export default UsersList;
