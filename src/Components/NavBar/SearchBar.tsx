import { useContext, useState } from "react";
import SearchAt from "./SearchAt";
import "../style/SearchBar.css";
import { SetPageContext } from "../App";
import SearchProps, { SearchAtType } from "../../SearchTypes";

const SearchBar: React.FC<{
  isActive: boolean;
  setSearchData: React.Dispatch<React.SetStateAction<SearchProps>>;
  searchAt: SearchAtType;
}> = ({ isActive, setSearchData, searchAt }) => {
  const setPage = useContext(SetPageContext);
  const [inputValue, setInputValue] = useState("");

  function handleClick() {
    setSearchData((prev) => {
      return { ...prev, query: inputValue };
    });
    setInputValue("");
    setPage("Search");
  }

  function setSearchAt(searchAt: SearchAtType) {
    setSearchData((prev) => {
      return { ...prev, searchAt };
    });
  }
  return (
    <div className="d-flex align-items-center">
      <span className={`me-2  ${isActive ? "" : "text-secondary"}`}>
        Search at
      </span>
      <SearchAt setSearchAt={setSearchAt} searchAt={searchAt} />
      <input
        type={"text"}
        className="ms-2 search-input"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <img
        src="./search_icon.svg"
        className="ms-2 filter-wight"
        onClick={handleClick}
        alt="icon"
      />
    </div>
  );
};

export default SearchBar;
