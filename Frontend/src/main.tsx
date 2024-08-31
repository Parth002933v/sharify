import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { RoutesTSX } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider {...RoutesTSX} />
    </QueryClientProvider>
  </React.StrictMode>,
);
