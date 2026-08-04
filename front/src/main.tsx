import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import UserLayout from "./layouts/UserLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserLayout />
  </StrictMode>,
);
