import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import layoutReducer from "../features/layout/layoutSlice";
import authReducer from "../features/auth/authSlice";

// Persist configuration
const persistConfig = {
  key: "root", // The key for localStorage
  storage,
};

// Combine reducers for layout and auth
const rootReducer = combineReducers({
  layout: layoutReducer,
  auth: authReducer,
});

// Apply persistReducer to the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warnings for redux-persist actions
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
