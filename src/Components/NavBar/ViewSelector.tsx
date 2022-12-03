import Dropdown from "react-bootstrap/Dropdown";
import "../style/ViewType.css";
import ViewType from "../../Types/ViewType";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { viewSlice } from "../../store/reducers/ViewSlice";
const ViewSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setView } = viewSlice.actions;
  const { view } = useAppSelector((state) => state.view);

  const views: ViewType[] = ["all tweets", "liked", "my tweets"];
  // eslint-disable-next-line array-callback-return
  const dropdowns = views.map((v) => {
    if (v !== view)
      return (
        <Dropdown.Item onClick={() => dispatch(setView(v))} key={v}>
          {v}
        </Dropdown.Item>
      );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={"secondary"}
        className={view === "all tweets" ? "all-tweets" : "my-tweets"}
        id="dropdown-basic"
        style={{ width: "7rem" }}
      >
        {view}
      </Dropdown.Toggle>
      <Dropdown.Menu>{dropdowns}</Dropdown.Menu>
    </Dropdown>
  );
};

export default ViewSelector;
