import React, { FormEvent, useContext } from "react";
import { Button } from "react-bootstrap";
import auth from "../lib/auth";
import { SetPageContext } from "./App";

const LogIn: React.FC = () => {
  const setPage = useContext(SetPageContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const [email, password] = [...elements] as HTMLInputElement[];
    await auth.logIn(email.value, password.value);

    setPage("Home");
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

      <Button
        variant="primary"
        onClick={async () => {
          await auth.signInGoogle();
          setPage("Home");
        }}
      >
        Google
      </Button>
    </div>
  );
};

export default LogIn;
