import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getConfiguration } from "../RTK/slices/config.slice";

function ConfigurationCheck({ children }) {
  const { status, config } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(getConfiguration());
  }, [status, dispatch]);

  if (status === "idle" || status === "loading") return <>loading..</>;

  if (!config.completed) return <Navigate to="/system-configuration" replace />;

  return <>{children}</>;
}

export default ConfigurationCheck;
