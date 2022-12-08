import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
interface Props {
  to: string;
  children?: ReactNode;
}

const StyledLink: React.FC<Props> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "link-active" : "link-not-active"
      }
    >
      {children}
    </NavLink>
  );
};

export default StyledLink;
