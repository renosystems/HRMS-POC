import React, { useState } from "react";
import { Text, Pane, TextInput, Button } from "evergreen-ui";
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
    <Pane
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        color="blue700"
        paddingBottom="30px"
        fontSize="2rem"
        fontWeight="700"
      >
        {t("login.title")}
      </Text>
      <Pane width="30%" display="flex" flexDirection="column">
        <TextInput
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          placeholder={t("login.username")}
          marginBottom="15px"
          width="100%"
        />
        <TextInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          placeholder={t("login.password")}
          marginBottom="20px"
          width="100%"
        />
        <Button
          onClick={handleLogin}
          isLoading={isLoading}
          appearance="primary"
          backgroundColor="#1F3D99"
          color="white"
          width="100%"
        >
          {t("login.loginBtnText")}
        </Button>
      </Pane>

      {isError && <div>Error occurred during login.</div>}
    </Pane>
  );
}

export default Login;
