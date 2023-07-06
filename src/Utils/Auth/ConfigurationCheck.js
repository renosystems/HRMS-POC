import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spinner, Pane } from "evergreen-ui";
import { getConfiguration } from "../RTK/slices/config.slice";

function ConfigurationCheck({ children }) {
  const { status, config } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(getConfiguration());
  }, [status, dispatch]);

  if (status === "idle" || status === "loading")
    return (
      <Pane>
        <Spinner marginX="auto" marginY={120} />
      </Pane>
    );

  if (!config.completed) return <Navigate to="/system-configuration" replace />;

  return <>{children}</>;
}

export default ConfigurationCheck;
