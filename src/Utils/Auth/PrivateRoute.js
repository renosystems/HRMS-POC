import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticatedLayout from "../../UI-Components/Layout/AuthenticatedLayout/AuthenticatedLayout";
import { useAuth } from "./AuthProvider";
import checkSessionTimeout from "./CheckSessionTimeout";

function PrivateRoute() {
  const { user } = useAuth();

  if (!user && checkSessionTimeout()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
}

export default PrivateRoute;
