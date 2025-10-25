import { ApiProvider } from "api";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import config from "./config"; // We will create this config file
import "@workspace/ui/globals.css";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { AppLayout } from "./layouts/AppLayout.tsx";
import { AnalyticsPage } from "./pages/AnalyticsPage.tsx";
import { CompaniesPage } from "./pages/CompaniesPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { ScpisPage } from "./pages/ScpisPage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AnalyticsPage /> },
      { path: "companies", element: <CompaniesPage /> },
      { path: "scpis", element: <ScpisPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider baseUrl={config.VITE_API_BASE_URL}>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>,
);
