import { FormEvent, useRef } from "react";
import "../style/SignUp.css";
import { Button } from "react-bootstrap";
import auth from "../../lib/auth";
import { useAppDispatch } from "../../hooks/redux";
import { pageSlice } from "../../store/reducers/PageSlice";

const SignUp: React.FC = () => {
  const refAlert = useRef<HTMLDivElement>(null);
  const { setPage } = pageSlice.actions;
  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const [email, password] = [...elements] as HTMLInputElement[];
    try {
      if (password.value.length < 7)
        throw "Password length should be bigger than 7";
      await auth.createUser(email.value, password.value);
      dispatch(setPage("Home"));
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

export default SignUp;
