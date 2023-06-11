import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../Utils/Auth/AuthProvider";
import checkSessionTimeout from "../../Utils/Auth/CheckSessionTimeout";

function Login() {
  const { t } = useTranslation();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, isError, user } = useAuth();

  const handleLogin = () => {
    // Perform login logic and call the login function from the AuthProvider
    const userData = { username, password };
    login(userData);
  };

  if (user || !checkSessionTimeout()) {
    // If the user is already logged in, redirect to the original route
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} replace={true} />;
  }

  return (
    <div>
      <h2>{t("login.title")}</h2>
      <label>{t("login.username")}:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>{t("login.password")}:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Loading..." : t("login.button")}
      </button>
      {isError && <div>Error occurred during login.</div>}
    </div>
  );
}

export default Login;
