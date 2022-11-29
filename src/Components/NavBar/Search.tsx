import { useContext, useState } from "react";
import SearchAt from "./SearchAt";
import "../style/Search.css";
import { SetPageContext } from "../App";

export type SearchAtType = "users" | "tweets";

const Search: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [searchAt, setSearchAt] = useState<SearchAtType>("tweets");
  const setPage = useContext(SetPageContext);

  return (
    <div className="d-flex align-items-center">
      <span className={`me-2  ${isActive ? "" : "text-secondary"}`}>
        Search at
      </span>
      <SearchAt searchAt={searchAt} setSearchAt={setSearchAt} />
      <input type={"text"} className="ms-2 search-input" />
      <img
        src="./search_icon.svg"
        className="ms-2 filter-wight"
        onClick={() => setPage("Search")}
      />
    </div>
  );
};

export default Search;
