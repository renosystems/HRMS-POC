import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticatedLayout from "../../Components/Layout/AuthenticatedLayout/AuthenticatedLayout";
import { useAuth } from "./AuthProvider";

function PrivateRoute({ element, ...rest }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
}

export default PrivateRoute;
