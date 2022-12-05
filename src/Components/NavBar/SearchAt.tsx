import Dropdown from "react-bootstrap/Dropdown";
import "../style/SearchAt.css";
import SearchAtType from "../../Types/SearchAtType";

const SearchAt: React.FC<{
  searchAt: SearchAtType;
  setSearchAt: React.Dispatch<React.SetStateAction<SearchAtType>>;
}> = ({ searchAt, setSearchAt }) => {
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
