import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.querySelector(".superuser_widget"));
root.render(
  <React.StrictMode>
    <App docElement={document.querySelector(".superuser_widget")} />
  </React.StrictMode>
);
