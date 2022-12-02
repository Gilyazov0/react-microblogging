import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pageReducer from "./reducers/PageSlice";
import viewReducer from "./reducers/ViewSlice";

const rootReducer = combineReducers({ pageReducer, viewReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
