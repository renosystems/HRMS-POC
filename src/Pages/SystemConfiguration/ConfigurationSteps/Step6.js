import React, { useCallback, useEffect, useState } from "react";
import { Pane, Text, Heading, Button, Spinner } from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addEmployee,
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
    )
    .required("This field is required"),
});

/**
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step6({ nextStep, stepBackHandler, currentConfigStep }) {
  const { status, employees } = useSelector((state) => state.employees);
  const [touched, setTouched] = useState(false);

  const [isAddingManager, setIsAddingManager] = useState(false);
  const [isAddingExcutive, setIsAddingExcutive] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phoneNumber: "",
      title: "ceo",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (touched) {
        dispatch(
          addEmployee({
            ...values,
            role: isAddingManager ? "manager" : "excutive",
          })
        );
      }

      if (isAddingManager) setIsAddingManager(false);
      else setIsAddingExcutive(false);
    },
  });

  const handleChange = useCallback(
    (e) => {
      if (!touched) setTouched(true);
      formik.handleChange(e);
    },
    [formik, touched]
  );

  const handleNext = useCallback(() => {
    if (currentConfigStep === 6) dispatch(updateConfiguration());

    nextStep();
  }, [currentConfigStep, dispatch, nextStep]);

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
      width="85%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="default"
    >
      {!isAddingExcutive && !isAddingManager ? (
        <Pane
          minHeight="60vh"
          marginX="auto"
          paddingY="50px"
          paddingX="50px"
          width="40%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          background="gray300"
          border="default"
        >
          <Pane>
            <Heading>
              Add managers and excutives to your system, and upon it you will
              assign managers to departments
            </Heading>
            <Text paddingY="10px" size={300} color="muted">
              Please note that excutives are higher in the heirarchy
            </Text>
            <Button
              onClick={() => {
                setIsAddingManager(true);
              }}
              background="white"
              color="grey"
              width="100%"
              marginBottom="15px"
              marginTop="20px"
            >
              Add managers
            </Button>
            <Button
              onClick={() => {
                setIsAddingExcutive(true);
              }}
              background="white"
              color="grey"
              width="100%"
            >
              Add excutives
            </Button>
          </Pane>

          <Pane
            display="flex"
            justifyContent={employees.length ? "space-between" : "flex-start"}
            alignItems="flex-end"
            width="100%"
            padding="auto"
          >
            <Button
              onClick={stepBackHandler}
              appearance="default"
              paddingY="20px"
              paddingX="35px"
            >
              Back
            </Button>
            {employees.length ? (
              <Button
                onClick={handleNext}
                appearance="main"
                paddingY="20px"
                paddingX="35px"
              >
                Skip to departments
              </Button>
            ) : null}
          </Pane>
        </Pane>
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
          <Heading>Adding {isAddingManager ? "manager" : "excutive"}</Heading>
          <Text paddingY="10px" size={300} color="muted">
            Add your {isAddingManager ? "manager" : "excutive"} details
          </Text>

          <HorisontalLabeledInput
            label="Employee Name"
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

          <Pane display="flex" justifyContent="space-between" width="100%">
            <Button
              onClick={() => {
                isAddingManager
                  ? setIsAddingManager(false)
                  : setIsAddingExcutive(false);
              }}
              appearance="default"
              paddingY="20px"
              paddingX="35px"
            >
              Cancel
            </Button>
            <Button
              onClick={formik.handleSubmit}
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

export default Step6;
