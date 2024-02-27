import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./reset.scss";
import UserTokenContextProvider from "./context/UserTokenContext.jsx";
import WatchlistProvider from "./context/WatchlistContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserTokenContextProvider>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </UserTokenContextProvider>
);
