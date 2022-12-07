import { combineReducers, configureStore } from "@reduxjs/toolkit";
import view from "./reducers/ViewSlice";
import user from "./reducers/UserSlice";
import search from "./reducers/SearchSlice";
import tweet from "./reducers/TweetSlice";
import profile from "./reducers/ProfileSlice";
const rootReducer = combineReducers({
  view,
  user,
  search,
  tweet,
  profile,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
