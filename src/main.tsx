import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import LocalMode from "./components/Local/index.tsx";
import OnlineMode from "./components/OnlineMode/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/play/local",
    element: <LocalMode />
  },
  {
    path: "/play/online",
    element: <OnlineMode />
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
