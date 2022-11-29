import Dropdown from "react-bootstrap/Dropdown";
import { SearchAtType } from "../../SearchTypes";

const SearchAt: React.FC<{
  setSearchAt: Function;
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
