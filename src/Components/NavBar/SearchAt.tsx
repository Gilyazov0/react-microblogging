import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { SearchAtType } from "./Search";

const SearchAt: React.FC<{
  setSearchAt: React.Dispatch<React.SetStateAction<SearchAtType>>;
  searchAt: SearchAtType;
}> = ({ setSearchAt, searchAt }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant={"secondary"} id="dropdown-basic">
        {searchAt}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() =>
            setSearchAt(searchAt === "tweets" ? "users" : "tweets")
          }
        >
          {searchAt === "tweets" ? "users" : "tweets"}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchAt;
