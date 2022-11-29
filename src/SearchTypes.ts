export type SearchAtType = "users" | "tweets";

export interface SearchProps {
  searchAt: SearchAtType;
  query: string;
}

export default SearchProps;
