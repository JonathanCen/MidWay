import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleMapProvider } from "./GoogleMapContext.js";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleMapProvider>
    <App />
  </GoogleMapProvider>
);
