import React, { useCallback, useEffect, useState } from "react";
import {
  Pane,
  Text,
  Heading,
  Button,
  PeopleIcon,
  Spinner,
  TextInputField,
} from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  addCeo,
  getEmployees,
} from "../../../Utils/RTK/slices/employees.slice";
import { updateConfiguration } from "../../../Utils/RTK/slices/config.slice";

import HorisontalLabeledInput from "../../../UI-Components/HorisontalLabeledInput/Index";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email address")
    .required("This field is required"),
  name: yup
    .string()
    .min(5, "Minimum five characters")
    .max(15, "Maximam fifteen characters")
    .required("This field is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Phone number is not valid"
    ),
  title: yup.string().oneOf(["ceo"], "Wrong title"),
});

/**
 * @param {Object} nextStep next step handler fn
 * @param {Number} currentConfigStep current configuration step in BE
 * @returns
 */
function Step5({ nextStep, currentConfigStep }) {
  const { status, ceo } = useSelector((state) => state.employees);
  const [touched, setTouched] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: ceo?.email || "",
      name: ceo?.name || "",
      phoneNumber: ceo?.phoneNumber || "",
      title: ceo?.title || "ceo",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (touched) {
        dispatch(addCeo(values));
        if (currentConfigStep === 5) dispatch(updateConfiguration());
      }

      nextStep();
    },
  });

  const [isSetupClicked, setIsSetupClicked] = useState(false);

  const handleChange = useCallback(
    (e) => {
      if (!touched) setTouched(true);
      formik.handleChange(e);
    },
    [formik, touched]
  );

  useEffect(() => {
    if (status === "idle") dispatch(getEmployees());
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") {
    return (
      <Pane>
        <Spinner marginX="auto" marginY={120} />
      </Pane>
    );
  }

  return (
    <Pane
      marginTop="50px"
      marginX="auto"
      paddingX="50px"
      paddingY="30px"
      height={!isSetupClicked && !ceo ? "60vh" : "auto"}
      width="85%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="default"
    >
      {!isSetupClicked && !ceo ? (
        <>
          <PeopleIcon size={50} color="muted" marginBottom="10px" />
          <Heading>
            Start building up your employnment management system
          </Heading>
          <Text paddingY="10px" size={300} color="muted">
            Add employees and departments to your HRMS
          </Text>
          <Button
            onClick={() => {
              setIsSetupClicked(true);
            }}
            appearance="main"
            paddingY="20px"
            paddingX="35px"
            marginTop="20px"
          >
            Setup your employees management
          </Button>
        </>
      ) : (
        <Pane
          marginX="auto"
          paddingY="50px"
          paddingX="50px"
          width="40%"
          display="flex"
          flexDirection="column"
          background="gray300"
          border="default"
        >
          <Heading>
            Before you start adding departments and users, add your CEO to the
            top management department
          </Heading>
          <Text paddingY="10px" size={300} color="muted">
            This step is created by default and your CEO is added to the top
            management department
          </Text>

          <HorisontalLabeledInput
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={handleChange}
            isInvalid={formik.touched.name && Boolean(formik.errors.name)}
            validationMessage={formik.touched.name && formik.errors.name}
            placeholder="Name"
            type="text"
            width="100%"
          />

          <HorisontalLabeledInput
            label="E-mail"
            name="email"
            value={formik.values.email}
            onChange={handleChange}
            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            validationMessage={formik.touched.email && formik.errors.email}
            placeholder="email"
            type="email"
            width="100%"
          />

          <HorisontalLabeledInput
            label="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={handleChange}
            isInvalid={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            validationMessage={
              formik.touched.phoneNumber && formik.errors.phoneNumber
            }
            placeholder="Phone Number"
            width="100%"
          />

          <HorisontalLabeledInput
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={handleChange}
            isInvalid={formik.touched.title && Boolean(formik.errors.title)}
            validationMessage={formik.touched.title && formik.errors.title}
            disabled={true}
            width="100%"
          />

          <Pane
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="100%"
          >
            <Button
              onClick={formik.handleSubmit}
              type="submit"
              appearance="main"
              paddingY="20px"
              paddingX="35px"
            >
              Next
            </Button>
          </Pane>
        </Pane>
      )}
    </Pane>
  );
}

export default Step5;
