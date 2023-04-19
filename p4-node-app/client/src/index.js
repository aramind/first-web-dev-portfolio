import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { ThemeProvider } from "@mui/material";
import muiTheme from "./muiTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
