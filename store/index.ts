import { configureStore, Middleware } from "@reduxjs/toolkit";
import slices, { SlicesType } from "./slices";
import persistState from "./middleware/persist";

const store = configureStore({
  reducer: slices,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistState as Middleware),
});

export default store;
export type StoreState = SlicesType;
export type StoreDispatch = typeof store.dispatch;
export type StoreAction = Parameters<StoreDispatch>[0];
