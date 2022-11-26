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
      <div className="title">Log in:</div>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type={"email"} name="email" />
        <label htmlFor="password" className="mt-2">
          Password
        </label>
        <input type={"password"} name="password" />

        <Button variant="primary" type="submit">
          Log in
        </Button>
      </form>

      <div className="mt-5">
        <span>Login using:</span>
        <img
          role="button"
          src="../../public/Google__G__Logo.svg"
          className="ms-2"
          onClick={async () => {
            await auth.signInGoogle();
            setPage("Home");
          }}
        />
      </div>
    </div>
  );
};

export default LogIn;
