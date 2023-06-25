import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticatedLayout from "../../UI-Components/Layout/AuthenticatedLayout/AuthenticatedLayout";

function PrivateRoute() {
  const { authenticated } = useSelector((state) => state.auth);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
}

export default PrivateRoute;
