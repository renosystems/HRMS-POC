import React, { useCallback, useEffect, useState } from "react";
import {
  Pane,
  Text,
  Heading,
  Button,
  Spinner,
  NewGridItemIcon,
  Radio,
} from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addDepartment,
  getDepartments,
} from "../../../Utils/RTK/slices/departments.slice";
import { updateConfiguration } from "../../../Utils/RTK/slices/config.slice";
import HorisontalLabeledInput from "../../../UI-Components/HorisontalLabeledInput/Index";
import { getEmployees } from "../../../Utils/RTK/slices/employees.slice";
import HorisontalLabeledSelect from "../../../UI-Components/HorisontalLabeledSelect/Index";

const validationSchema = yup.object().shape({
  order: yup.string().required("This field is required"),
  name: yup
    .string()
    .min(5, "Minimum five characters")
    .max(15, "Maximam fifteen characters")
    .required("This field is required"),
  manager: yup.string(),
  excutive: yup.string(),
});

/**
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step7({ stepBackHandler }) {
  const { status, departments } = useSelector((state) => state.departments);
  const { managers, excutives } = useSelector((state) => state.employees);

  const [isAddFirstClicked, setIsAddFirstClicked] = useState(false);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [touched, setTouched] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      order: "ascending",
      name: "",
      manager: "none",
      excutive: "none",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (touched) {
        dispatch(addDepartment({ ...values }));
        setIsAddingDepartment(false);
      }
    },
  });

  const handleChange = useCallback(
    (e) => {
      if (!touched) setTouched(true);
      formik.handleChange(e);
    },
    [formik, touched]
  );

  const handleNextSep = () => setCurrentStep(2);

  const handleFinish = useCallback(() => {
    dispatch(updateConfiguration());
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getDepartments());
      dispatch(getEmployees());
    }
  }, [dispatch, status]);

  // useEffect(() => {
  //   if (managers && !formik.values.manager)
  //     formik.setFieldValue("manager", "none");

  //   if (excutives && !formik.values.excutive)
  //     formik.setFieldValue("excutive", "none");
  // }, [excutives, formik, managers]);

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
      {!isAddFirstClicked && !departments.length ? (
        <Pane
          minHeight="60vh"
          marginX="auto"
          paddingY="90px"
          paddingX="50px"
          width="40%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          background="gray300"
          border="default"
        >
          <Pane textAlign="center" marginX="auto">
            <NewGridItemIcon size={30} color="muted" marginBottom="10px" />
            <Heading>Add your first department</Heading>
            <Text paddingY="10px" size={300} color="muted">
              Add your departments to the system to users of each department
            </Text>
            <Button
              onClick={() => {
                setIsAddFirstClicked(true);
                setIsAddingDepartment(true);
              }}
              appearance="main"
              color="grey"
              width="100%"
              marginBottom="15px"
              marginTop="20px"
            >
              Add Department
            </Button>
          </Pane>

          <Pane>
            <Button
              onClick={stepBackHandler}
              appearance="default"
              paddingY="20px"
              paddingX="35px"
            >
              Back to Managers
            </Button>
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
          <Heading>
            Create departments and assign managers that previously created to
            your department
          </Heading>
          <Text paddingY="10px" size={300} color="muted">
            Create departments and assign managers and excutives
          </Text>

          {isAddingDepartment ? (
            <Pane
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              minHeight="50vh"
            >
              {currentStep === 1 ? (
                <Pane aria-label="Radio Group Heirarchry levels" role="group">
                  <Radio
                    name="order"
                    label="Ascending Heirarchry levels"
                    value="ascending"
                    onChange={() => formik.setFieldValue("order", "ascending")}
                    fontWeight="900"
                    checked={formik.values.order === "ascending"}
                  />
                  <Radio
                    name="order"
                    label="Descending Heirarchry levels"
                    value="descending"
                    onChange={() => formik.setFieldValue("order", "descending")}
                    checked={formik.values.order === "descending"}
                  />
                </Pane>
              ) : (
                <Pane>
                  <HorisontalLabeledInput
                    label="Department Name"
                    name="name"
                    value={formik.values.name}
                    onChange={handleChange}
                    isInvalid={
                      formik.touched.name && Boolean(formik.errors.name)
                    }
                    validationMessage={
                      formik.touched.name && formik.errors.name
                    }
                    placeholder="Name"
                    type="text"
                    width="100%"
                  />

                  {managers ? (
                    <HorisontalLabeledSelect
                      label="Manager"
                      name="manager"
                      value={formik.values.manager}
                      onChange={handleChange}
                      isInvalid={
                        formik.touched.manager && Boolean(formik.errors.manager)
                      }
                      validationMessage={
                        formik.touched.manager && formik.errors.manager
                      }
                      options={[
                        { label: "none", value: "" },
                        ...managers.map((manager) => ({
                          label: manager.name,
                          value: manager.name,
                        })),
                      ]}
                      width="100%"
                    />
                  ) : null}

                  {excutives?.length ? (
                    <HorisontalLabeledSelect
                      label="Report to"
                      name="excutive"
                      value={formik.values.excutive}
                      onChange={handleChange}
                      isInvalid={
                        formik.touched.excutive &&
                        Boolean(formik.errors.excutive)
                      }
                      validationMessage={
                        formik.touched.excutive && formik.errors.excutive
                      }
                      options={[
                        { label: "none", value: "" },
                        ...managers.map((manager) => ({
                          label: manager.name,
                          value: manager.name,
                        })),
                      ]}
                      width="100%"
                    />
                  ) : null}
                </Pane>
              )}

              <Pane
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                width="100%"
                padding="auto"
                paddingY="20px"
              >
                <Button
                  onClick={() => {
                    if (currentStep === 2) setCurrentStep(1);
                    else {
                      setIsAddFirstClicked(false);
                      setIsAddingDepartment(false);
                    }
                  }}
                  appearance="default"
                  paddingY="20px"
                  paddingX="35px"
                >
                  Back
                </Button>

                <Button
                  onClick={
                    currentStep === 1 ? handleNextSep : formik.handleSubmit
                  }
                  appearance="main"
                  paddingY="20px"
                  paddingX="35px"
                >
                  Next
                </Button>
              </Pane>
            </Pane>
          ) : (
            <>
              <Pane>
                {departments.map((dep) => (
                  <Button
                    background="white"
                    color="grey"
                    width="100%"
                    marginY="10px"
                    key={dep.name}
                  >
                    {dep.name}
                  </Button>
                ))}
                <hr style={{ width: "100%" }} />
                <Button
                  onClick={() => {
                    setIsAddingDepartment(true);
                  }}
                  background="white"
                  color="grey"
                  width="100%"
                  marginY="20px"
                >
                  Add department
                </Button>
              </Pane>

              <Pane
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                width="100%"
                padding="auto"
                paddingY="20px"
              >
                <Button
                  onClick={() => {
                    if (currentStep === 2) setCurrentStep(1);
                    else {
                      setIsAddFirstClicked(false);
                      setIsAddingDepartment(false);
                    }
                  }}
                  appearance="default"
                  paddingY="20px"
                  paddingX="35px"
                >
                  Back
                </Button>

                <Button
                  onClick={handleFinish}
                  appearance="main"
                  paddingY="20px"
                  paddingX="35px"
                >
                  Finish and continue
                </Button>
              </Pane>
            </>
          )}
        </Pane>
      )}
    </Pane>
  );
}

export default Step7;
