import React, { FormEvent } from "react";
import { useRef, useEffect } from "react";
import "./style/Profile.css";
import { Button } from "react-bootstrap";
import Auth from "../lib/auth";
interface ProfileProps {
  user: string;
  setUser: (user: string) => void;
}
const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const [name, email, password] = [...elements] as HTMLInputElement[];
    const auth = new Auth();
    auth.createUser(email.value, password.value, name.value);
  }

  return (
    <div className="profile">
      <div className="title">Profile</div>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label htmlFor="name">User name</label>
        <input type={"text"} name="name" />
        <label htmlFor="email">Email</label>
        <input type={"email"} name="email" />
        <label htmlFor="password">Password</label>
        <input type={"password"} name="password" />

        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Profile;
