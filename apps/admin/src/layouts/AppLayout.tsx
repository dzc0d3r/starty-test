import * as React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow p-6 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
};
