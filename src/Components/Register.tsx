import React, { FormEvent, useContext } from "react";
import "./style/Register.css";
import { Button } from "react-bootstrap";
import auth from "../lib/auth";
import { SetPageContext } from "./App";

const Register: React.FC = () => {
  const setPage = useContext(SetPageContext);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const [name, email, password] = [...elements] as HTMLInputElement[];
    auth.createUser(email.value, password.value, name.value);

    setPage("Home");
  }

  return (
    <div className="profile">
      <div className="title">Sign in</div>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label htmlFor="name">User name</label>
        <input type={"text"} name="name" />
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <input type={"email"} name="email" />
        <label htmlFor="password" className="mt-2">
          Password
        </label>
        <input type={"password"} name="password" />

        <Button variant="primary" type="submit">
          Sing in
        </Button>
      </form>
    </div>
  );
};

export default Register;
