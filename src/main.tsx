import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider, Theme } from "./contexts/ThemeContext.jsx";
import { HeroUIProvider } from "@heroui/react";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider
          defaultTheme={Theme.system}
          storageKey="lms-client-theme"
        >
          <HeroUIProvider>
            <App />
          </HeroUIProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
