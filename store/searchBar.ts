import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchBarState {
  searchBarOpen: boolean;
}

const initialState = {
  searchBarOpen: false,
} as SearchBarState;

const searchBar = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSearchBarOpen(state, action: PayloadAction<boolean>) {
      state.searchBarOpen = action.payload;
    },
  },
});

export const { setSearchBarOpen } = searchBar.actions;

export default searchBar.reducer;
