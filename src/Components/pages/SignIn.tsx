import { FormEvent, useRef } from "react";
import { Button } from "react-bootstrap";
import auth from "../../lib/auth";

const LogIn: React.FC = () => {
  const refAlert = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refAlert.current?.classList.add("d-none");
    const elements = e.currentTarget.elements;
    const [email, password] = [...elements] as HTMLInputElement[];
    try {
      await auth.logIn(email.value, password.value);
    } catch (error) {
      const alert = refAlert.current;
      if (!alert) return;
      alert.classList.remove("d-none");
      alert.innerText! = (error as Error).message;
    }
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
        <div className="d-flex align-items-center mt-3">
          <div
            className="alert alert-danger p-1 m-0 d-none"
            ref={refAlert}
          ></div>
          <div className="flex-grow-1"></div>
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </div>
      </form>

      <div className="mt-5">
        <span>Log in using:</span>
        <img
          role="button"
          src="../../Google__G__Logo.svg"
          alt="google"
          className="ms-2"
          onClick={async () => {
            await auth.signInGoogle();
          }}
        />
      </div>
    </div>
  );
};

export default LogIn;
