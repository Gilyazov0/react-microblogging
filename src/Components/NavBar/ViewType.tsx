import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ViewTypeContext } from "../App";
import "../style/ViewType.css";
const ViewType: React.FC<{ setViewType: Function }> = ({ setViewType }) => {
  const viewType = useContext(ViewTypeContext);

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={"secondary"}
        className={viewType === "all tweets" ? "all-tweets" : "my-tweets"}
        id="dropdown-basic"
      >
        {viewType}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() =>
            setViewType(viewType === "all tweets" ? "my tweets" : "all tweets")
          }
        >
          {viewType === "all tweets" ? "my tweets" : "all tweets"}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ViewType;
