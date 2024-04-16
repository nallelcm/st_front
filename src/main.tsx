import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/roboto";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "./contexts/AuthProviderContext";
import { SpaceTraderProvider } from "./contexts/SpaceTraderContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SpaceTraderProvider>
        <App />
      </SpaceTraderProvider>
    </AuthProvider>
  </React.StrictMode>
);
