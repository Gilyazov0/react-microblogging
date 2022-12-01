import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ViewTypeContext } from "../App";
import "../style/ViewType.css";
import ViewType from "../../Types/ViewType";
const ViewSelector: React.FC<{ setViewType: Function }> = ({ setViewType }) => {
  const viewType = useContext(ViewTypeContext);

  const views: ViewType[] = ["all tweets", "liked", "my tweets"];
  const dropdowns = views.map((view) => {
    if (view !== viewType)
      return (
        <Dropdown.Item onClick={() => setViewType(view)} key={view}>
          {view}
        </Dropdown.Item>
      );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={"secondary"}
        className={viewType === "all tweets" ? "all-tweets" : "my-tweets"}
        id="dropdown-basic"
        style={{ width: "7rem" }}
      >
        {viewType}
      </Dropdown.Toggle>
      <Dropdown.Menu>{dropdowns}</Dropdown.Menu>
    </Dropdown>
  );
};

export default ViewSelector;
