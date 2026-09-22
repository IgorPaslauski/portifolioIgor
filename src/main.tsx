import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "lenis/dist/lenis.css";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
