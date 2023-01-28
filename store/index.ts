import layoutSlice from "@/store/layoutSlice";
import searchBar from "@/store/searchBar";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    layout: layoutSlice,
    searchBar: searchBar,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
