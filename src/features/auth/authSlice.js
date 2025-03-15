import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, 
  user: null,
  roles:[],
  hasManagementAccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {

      state.user = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
      state.hasManagementAccess = action.payload.includes("Admin") || action.payload.includes("User");
    },
    clearAuth: (state) => {
    localStorage.removeItem('authToken');

      state.isAuthenticated = false;
      state.user = null;
      state.hasManagementAccess = false; 
    },
  },
});

export const { setAuthentication, setUser, clearAuth , setRoles} = authSlice.actions;
export default authSlice.reducer;
