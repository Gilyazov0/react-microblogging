import React, { FormEvent, useContext, useRef } from "react";
import "./style/SignUp.css";
import { Button } from "react-bootstrap";
import auth from "../lib/auth";
import { SetPageContext } from "./App";

const Register: React.FC = () => {
  const setPage = useContext(SetPageContext);
  const refAlert = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const [name, email, password] = [...elements] as HTMLInputElement[];
    try {
      if (name.value.length < 5) throw "Name length should be bigger than 4";
      if (password.value.length < 5)
        throw "Password length should be bigger than 7";
      await auth.createUser(email.value, password.value, name.value);
      setPage("Home");
    } catch (error) {
      const alert = refAlert.current;
      if (!alert) return;
      alert.classList.remove("d-none");
      alert.innerText! = error as string;
    }
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

        <div className="d-flex align-items-center mt-3">
          <div
            className="alert alert-danger p-1 m-0 d-none"
            ref={refAlert}
          ></div>
          <div className="flex-grow-1"></div>

          <Button variant="primary" type="submit">
            Sing in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
