import { useAdminGetMeQuery } from "api";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError, data: user, isSuccess } = useAdminGetMeQuery();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isSuccess && user) {
    return <main className="max-h-screen overflow-y-hidden">{children}</main>;
  }

  // As a fallback, render nothing or a spinner, though this case is unlikely.
  return null;
};
