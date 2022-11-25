import React from "react";
import { Pages } from "./App";

interface LinkProps {
  setPage: (page: Pages) => void;
  isActive: boolean;
  text: string;
  pageName: Pages;
}

const Link: React.FC<LinkProps> = (props: LinkProps) => {
  return (
    <span
      onClick={() => props.setPage(props.pageName)}
      className={`link ${props.isActive ? "" : "text-secondary"}`}
    >
      {props.text}
    </span>
  );
};

export default Link;
