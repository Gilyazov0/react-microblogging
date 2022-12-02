import { useAppSelector } from "../../hooks/redux";
const Search: React.FC = () => {
  const { query, searchAt } = useAppSelector((state) => state.searchSlice);

  console.log(query, searchAt);
  return <>Search</>;
};

export default Search;
