import { useState } from "react";
import SearchAt from "./SearchAt";
import "../style/SearchBar.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { pageSlice } from "../../store/reducers/PageSlice";
import { searchSlice } from "../../store/reducers/SearchSlice";
import SearchAtType from "../../Types/SearchAtType";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchAt, setSearchAt] = useState<SearchAtType>("tweets");

  const { page } = useAppSelector((state) => state.page);
  const { setPage } = pageSlice.actions;
  const dispatch = useAppDispatch();
  const { setSearchParams } = searchSlice.actions;

  function handleClick() {
    dispatch(setSearchParams({ query: inputValue, searchAt: searchAt }));
    setInputValue("");
    dispatch(setPage("Search"));
  }

  return (
    <div className="d-flex align-items-center">
      <span className={`me-2  ${page === "Search" ? "" : "text-secondary"}`}>
        Search at
      </span>
      <SearchAt searchAt={searchAt} setSearchAt={setSearchAt} />
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
