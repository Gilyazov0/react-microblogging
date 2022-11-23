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
    props.setUser(nameRef.current!.value);
  }

  useEffect(() => {
    if (nameRef.current) nameRef.current.value = props.user;
  }, [nameRef]);

  return (
    <div className="profile">
      <div className="title">Profile</div>
      <label htmlFor="name">User name:</label>
      <input type={"text"} name="name" ref={nameRef} />

      <Button variant="primary" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default Profile;
