import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataProvider } from "./Context/DataContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>
);
