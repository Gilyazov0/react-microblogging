import React from "react";
import { useRef, useEffect } from "react";
import "./style/Profile.css";
import { Button } from "react-bootstrap";

interface ProfileProps {
  user: string;
  setUser: (user: string) => void;
}
const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const nameRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    console.log(nameRef.current!.value);
  }

  useEffect(() => {
    if (nameRef.current) nameRef.current.value = props.user;
  }, [nameRef]);

  return (
    <div className="profile">
      <div className="title">Profile</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">User name</label>
        <input type={"text"} name="name" ref={nameRef} />

        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Profile;
