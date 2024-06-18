import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./app";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./components/ui/theme/theme";
import { UserProvider } from "./contexts/context-user/context-user";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
