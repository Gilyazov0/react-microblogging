import { useState } from "react";
import SearchAt from "./SearchAt";
import "../style/SearchBar.css";
import { useAppDispatch } from "../../hooks/redux";
import { searchSlice } from "../../store/reducers/SearchSlice";
import SearchAtType from "../../Types/SearchAtType";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchAt, setSearchAt] = useState<SearchAtType>("tweets");

  const dispatch = useAppDispatch();
  const { setSearchParams } = searchSlice.actions;

  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    dispatch(setSearchParams({ query: inputValue, searchAt: searchAt }));
    setInputValue("");
    navigate("/search");
  }

  return (
    <div className="d-flex align-items-center">
      <span
        className={`me-2 hide-on-small-screen ${
          location.pathname === "/search" ? "" : "link-not-active"
        }`}
      >
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
