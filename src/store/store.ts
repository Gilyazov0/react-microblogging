import { combineReducers, configureStore } from "@reduxjs/toolkit";
import page from "./reducers/PageSlice";
import view from "./reducers/ViewSlice";
import user from "./reducers/UserSlice";
import search from "./reducers/SearchSlice";
import tweet from "./reducers/TweetSlice";
const rootReducer = combineReducers({
  page,
  view,
  user,
  search,
  tweet,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
