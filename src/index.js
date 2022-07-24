import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const WidgetDivs = document.querySelectorAll(".superuser_widget");
WidgetDivs.forEach((widget) => {
  const root = ReactDOM.createRoot(widget);
  root.render(
    // <React.StrictMode>
      <App docElement={widget} />
    // </React.StrictMode> 
  );
});
