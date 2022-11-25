import React, { FormEvent } from "react";
import { Button } from "react-bootstrap";
import auth from "../lib/auth";

const LogIn: React.FC = () => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const [email, password] = [...elements] as HTMLInputElement[];
    auth.logIn(email.value, password.value);
  }

  return (
    <div className="profile">
      <div className="title">Profile</div>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type={"email"} name="email" />
        <label htmlFor="password">Password</label>
        <input type={"password"} name="password" />

        <Button variant="primary" type="submit">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
