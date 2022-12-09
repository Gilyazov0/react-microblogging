import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux";

/**
 * Redirect unsigned users to "Sign in" page
 */
export default function useUnsignedRedirect() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/signIn");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
}
