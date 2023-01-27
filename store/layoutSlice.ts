import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  sidebarOpen: boolean;
  accommodationSelectOpen: boolean;
}

const initialState = {
  sidebarOpen: false,
  accommodationSelectOpen: false,
} as LayoutState;

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setAccommodationSelectOpen(state, action: PayloadAction<boolean>) {
      state.accommodationSelectOpen = action.payload;
    },
  },
});

export const { setSidebarOpen, setAccommodationSelectOpen } =
  layoutSlice.actions;

export default layoutSlice.reducer;
