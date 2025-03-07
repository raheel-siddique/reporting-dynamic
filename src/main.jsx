import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import store, { persistor } from "./store/store";
import "./index.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// if (!googleClientId) {
//   console.error("Google Client ID is not defined in .env file");
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId={googleClientId!}> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
