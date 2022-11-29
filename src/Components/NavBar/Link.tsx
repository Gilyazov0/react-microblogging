import { useContext } from "react";
import { Pages, SetPageContext } from "../App";
interface LinkProps {
  isActive: boolean;
  text: string;
  pageName: Pages;
}

const Link: React.FC<LinkProps> = ({ isActive, pageName, text }) => {
  const setPage = useContext(SetPageContext);

  return (
    <span
      onClick={() => setPage(pageName)}
      className={`link ${isActive ? "" : "text-secondary"}`}
    >
      {text}
    </span>
  );
};

export default Link;
