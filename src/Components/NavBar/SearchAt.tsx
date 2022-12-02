import Dropdown from "react-bootstrap/Dropdown";
import "../style/SearchAt.css";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { searchSlice } from "../../store/reducers/SearchSlice";

const SearchAt: React.FC = () => {
  const { searchAt } = useAppSelector((state) => state.searchSlice);
  const dispatch = useAppDispatch();
  const { setSearchParams } = searchSlice.actions;

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={"secondary"}
        id="dropdown-basic"
        className="searchAt-button"
      >
        <span>{searchAt} </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() =>
            dispatch(
              setSearchParams({
                searchAt: searchAt === "tweets" ? "users" : "tweets",
              })
            )
          }
        >
          {searchAt === "tweets" ? "users" : "tweets"}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchAt;
