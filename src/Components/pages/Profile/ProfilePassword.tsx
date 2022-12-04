import { useRef } from "react";
import { Button } from "react-bootstrap";
import auth from "../../../lib/auth";

const ProfilePassword: React.FC = () => {
  const refAlert = useRef<HTMLDivElement>(null);
  const refSuccess = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function toggleRef(ref: React.RefObject<HTMLDivElement>, show: boolean) {
    const el = ref.current;
    if (!el) return;
    show ? el.classList.remove("d-none") : el.classList.add("d-none");
  }

  async function handleClick() {
    try {
      toggleRef(refSuccess, false);
      toggleRef(refAlert, false);
      const password = inputRef.current!.value;
      if (password.length < 7)
        throw new Error("Password length should be bigger than 7");
      await auth.updatePassword(password);
      toggleRef(refSuccess, true);
    } catch (error) {
      const alert = refAlert.current;
      if (!alert) return;
      alert.classList.remove("d-none");
      alert.innerText! = error as string;
    }
  }

  return (
    <>
      <span className="mt-2">Password</span>
      <div className="d-flex align-items-center">
        <input
          type={"password"}
          name="password"
          className="flex-grow-1 me-2"
          ref={inputRef}
        />
        <Button
          variant="primary"
          type="submit"
          className="align-self-center"
          onClick={handleClick}
        >
          Change
        </Button>
      </div>
      <div className="alert alert-danger p-1 mt-2  d-none" ref={refAlert}></div>
      <div className="alert alert-success  p-1 mt-2  d-none" ref={refSuccess}>
        Password changed
      </div>
    </>
  );
};

export default ProfilePassword;
