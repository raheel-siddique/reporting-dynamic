// src/features/layout/layoutSlice.ts
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  isSidebarOpen: false, // Sidebar is initially closed
  darkMode: false,      // Light mode is initially active
};

// Create the slice
const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Export the actions and reducer
export const { toggleSidebar, toggleTheme } = layoutSlice.actions;
export default layoutSlice.reducer;
