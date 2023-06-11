import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FormDashboard } from "./routes/FormsDashboard";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignIn } from "./routes/SignIn";
import { SignUp } from "./routes/SignUp";
import { Protected } from "./routes/Protected";
import Dashboard from "./routes/Dashboard";
import Counselling from "./routes/Counselling";
import Volunteer from "./routes/Volunteer";

const router = createBrowserRouter([
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  {
    path: "/",
    element: <Protected />,
    children: [
      { path: "/", element: <Navigate to={"/dashboard"} /> },
      { path: "/form-builder/:formId", element: <App /> },
      { path: "/forms", element: <FormDashboard /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/counselling",
        element: <Counselling />,
      },
      {
        path: "/volunteer",
        element: <Volunteer />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <FormDashboard /> */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
