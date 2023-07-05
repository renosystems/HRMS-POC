import React, { useEffect, useState } from "react";
import { Text, Pane, TextInputField, Button, Checkbox } from "evergreen-ui";
import { useTranslation } from "react-i18next";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkCach, login } from "../../Utils/RTK/slices/auth.slice";

function Login() {
  const { t } = useTranslation();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const { authenticated, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Perform login logic and call the login function from the AuthProvider
    const userData = { username: email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(checkCach());
    }
  }, [dispatch, status]);

  if (authenticated) {
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
      backgroundColor="grey"
    >
      <Pane
        width="35%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingX="40px"
        paddingY="80px"
        backgroundColor="white"
      >
        <Text
          color="grey"
          paddingBottom="60px"
          fontSize="2rem"
          fontWeight="700"
        >
          {t("login.title")}
        </Text>
        <Pane width="100%" display="flex" flexDirection="column">
          <TextInputField
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="username"
            placeholder={t("login.username")}
            marginBottom="15px"
            inputWidth="100%"
            inputHeight={50}
          />
          <TextInputField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder={t("login.password")}
            inputWidth="100%"
            inputHeight={50}
            marginBottom="10px"
          />

          <Checkbox
            label="Remember me"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />

          <Button
            onClick={handleLogin}
            isLoading={status === "loading"}
            appearance="main"
            width="100%"
            marginTop="50px"
          >
            {t("login.loginBtnText")}
          </Button>
        </Pane>

        {error && <div>Error occurred during login.</div>}
      </Pane>
    </Pane>
  );
}

export default Login;
