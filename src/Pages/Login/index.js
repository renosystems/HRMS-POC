import React, { useEffect, useState } from "react";
import { Text, Pane, TextInputField, Button, Checkbox } from "evergreen-ui";
import { useTranslation } from "react-i18next";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkCach, login } from "../../Utils/RTK/slices/auth.slice";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email address")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});

function Login() {
  const { t } = useTranslation();
  const location = useLocation();
  const [touched, setTouched] = useState(false);
  const [checked, setChecked] = useState(false);
  const { authenticated, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userData = { username: values.email, password: values.password };
      // Perform login logic and call the login function from the AuthProvider
      dispatch(login(userData));
    },
  });

  const handleChange = (e) => {
    if (!touched) setTouched(true);
    formik.handleChange(e);
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
            name="email"
            value={formik.values.email}
            onChange={handleChange}
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            validationMessage={formik.touched.email && formik.errors.email}
            placeholder={t("login.username")}
            marginBottom="15px"
            inputWidth="100%"
            inputHeight={50}
          />
          <TextInputField
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={handleChange}
            isInvalid={
              formik.touched.password && Boolean(formik.errors.password)
            }
            validationMessage={
              formik.touched.password && formik.errors.password
            }
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
            onClick={formik.handleSubmit}
            isLoading={status === "loading"}
            disabled={!touched}
            appearance="main"
            width="100%"
            marginTop="50px"
            type="submit"
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
