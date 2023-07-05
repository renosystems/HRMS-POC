import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ConfigurationCheck from "./ConfigurationCheck";
import AuthenticatedLayout from "../../UI-Components/Layout/AuthenticatedLayout/AuthenticatedLayout";

function PrivateRoute() {
  const { authenticated } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (pathname === "/system-configuration") return <Outlet />;

  return (
    <ConfigurationCheck>
      <AuthenticatedLayout>
        <Outlet />
      </AuthenticatedLayout>
    </ConfigurationCheck>
  );
}

export default PrivateRoute;
