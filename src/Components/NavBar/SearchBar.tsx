import { useContext, useState } from "react";
import SearchAt from "./SearchAt";
import "../style/SearchBar.css";
import SearchProps, { SearchAtType } from "../../SearchTypes";
import { useAppDispatch } from "../../hooks/redux";
import { pageSlice } from "../../store/reducers/PageSlice";

const SearchBar: React.FC<{
  isActive: boolean;
  setSearchData: React.Dispatch<React.SetStateAction<SearchProps>>;
  searchAt: SearchAtType;
}> = ({ isActive, setSearchData, searchAt }) => {
  const [inputValue, setInputValue] = useState("");

  const { setPage } = pageSlice.actions;
  const dispatch = useAppDispatch();

  function handleClick() {
    setSearchData((prev) => {
      return { ...prev, query: inputValue };
    });
    setInputValue("");
    dispatch(setPage("Search"));
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
        className="ms-2 filter-white search-icon"
        onClick={handleClick}
        alt="icon"
      />
    </div>
  );
};

export default SearchBar;
