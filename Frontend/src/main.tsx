import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { RoutesTSX } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "./store/index.ts";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}

    <Provider store={store}>
      <RouterProvider {...RoutesTSX} />
    </Provider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>,
);
