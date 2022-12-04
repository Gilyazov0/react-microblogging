import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { pageSlice } from "../../store/reducers/PageSlice";
import Pages from "../../Types/Pages";
interface LinkProps {
  text: string;
  pageName: Pages;
  onClickExtra?: Function;
}

const Link: React.FC<LinkProps> = ({ pageName, text, onClickExtra }) => {
  const { page } = useAppSelector((state) => state.page);

  const { setPage } = pageSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <span
      onClick={() => {
        dispatch(setPage(pageName));
        if (onClickExtra) onClickExtra();
      }}
      className={`link ${page === pageName ? "" : "text-secondary"}`}
    >
      {text}
    </span>
  );
};

export default Link;
