import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext.jsx";
import UserContextProvider from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <HeroUIProvider>
          <App />
          <ToastContainer />
        </HeroUIProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
