import { useContext } from "react";
import { Pages, SetPageContext } from "./App";
interface LinkProps {
  isActive: boolean;
  text: string;
  pageName: Pages;
}

const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const setPage = useContext(SetPageContext);

  return (
    <span
      onClick={() => setPage(props.pageName)}
      className={`link ${props.isActive ? "" : "text-secondary"}`}
    >
      {props.text}
    </span>
  );
};

export default Link;
