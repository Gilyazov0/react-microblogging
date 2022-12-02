import { useAppDispatch } from "../../hooks/redux";
import { pageSlice } from "../../store/reducers/PageSlice";
import Pages from "../../Types/Pages";
interface LinkProps {
  isActive: boolean;
  text: string;
  pageName: Pages;
}

const Link: React.FC<LinkProps> = ({ isActive, pageName, text }) => {
  const { setPage } = pageSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <span
      onClick={() => dispatch(setPage(pageName))}
      className={`link ${isActive ? "" : "text-secondary"}`}
    >
      {text}
    </span>
  );
};

export default Link;
