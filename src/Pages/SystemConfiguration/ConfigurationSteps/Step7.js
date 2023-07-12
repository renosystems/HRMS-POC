import React, { useCallback, useEffect, useState } from "react";
import {
  Pane,
  Text,
  Heading,
  Button,
  Spinner,
  NewGridItemIcon,
  Radio,
  Label,
  TextInputField,
} from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
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
              <Formik
                initialValues={{
                  order: "ascending",
                  name: "",
                  manager: "none",
                  excutive: "none",
                  levels: [],
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  if (touched) {
                    dispatch(addDepartment({ ...values }));
                    setIsAddingDepartment(false);
                    setCurrentStep(1);
                    setTouched(false);
                  }
                }}
              >
                {({
                  values,
                  setFieldValue,
                  errors,
                  handleSubmit,
                  handleChange,
                }) => {
                  const handleFieldChange = (e) => {
                    if (!touched) setTouched(true);
                    handleChange(e);
                  };

                  return (
                    <Form>
                      {currentStep === 1 ? (
                        <Pane
                          aria-label="Radio Group Heirarchry levels"
                          role="group"
                        >
                          <Radio
                            name="order"
                            label="Ascending Heirarchry levels"
                            value="ascending"
                            onChange={() => setFieldValue("order", "ascending")}
                            fontWeight="900"
                            checked={values.order === "ascending"}
                          />
                          <Radio
                            name="order"
                            label="Descending Heirarchry levels"
                            value="descending"
                            onChange={() =>
                              setFieldValue("order", "descending")
                            }
                            checked={values.order === "descending"}
                          />
                        </Pane>
                      ) : (
                        <Pane>
                          <HorisontalLabeledInput
                            label="Department Name"
                            name="name"
                            value={values.name}
                            onChange={handleFieldChange}
                            isInvalid={touched && Boolean(errors.name)}
                            validationMessage={touched && errors.name}
                            placeholder="Name"
                            type="text"
                            width="100%"
                          />

                          <HorisontalLabeledSelect
                            label="Manager"
                            name="manager"
                            value={values.manager}
                            onChange={handleFieldChange}
                            isInvalid={touched && Boolean(errors.manager)}
                            validationMessage={
                              touched && Boolean(errors.manager)
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

                          <HorisontalLabeledSelect
                            label="Report to"
                            name="excutive"
                            value={values.excutive}
                            onChange={handleFieldChange}
                            isInvalid={touched && Boolean(errors.excutive)}
                            validationMessage={touched && errors.excutive}
                            options={[
                              { label: "none", value: "" },
                              ...excutives.map((manager) => ({
                                label: manager.name,
                                value: manager.name,
                              })),
                            ]}
                            width="100%"
                          />

                          <hr style={{ width: "100%" }} />

                          <Heading>Department titles</Heading>
                          <Text>
                            Ascending or descending based on your company's
                            Heirarchry
                          </Text>

                          <FieldArray
                            name="levels"
                            render={(arrayHelpers) => (
                              <div>
                                {values.levels ? (
                                  <>
                                    {values.levels.map((lvl, index) => (
                                      <div key={index}>
                                        <Pane
                                          display="flex"
                                          justifyContent="space-between"
                                          marginBottom="20px"
                                        >
                                          <Label marginTop="8px">
                                            {lvl.name}
                                          </Label>

                                          <FieldArray
                                            name={`levels.${index}.titles`}
                                            render={(arrayHelpers) => (
                                              <Pane
                                                display="flex"
                                                flexDirection="column"
                                              >
                                                {values.levels[
                                                  index
                                                ].titles.map((title, i) => (
                                                  <div key={i}>
                                                    <Pane display="flex">
                                                      <TextInputField
                                                        name={`levels.${index}.titles.${i}`}
                                                        onChange={handleChange}
                                                        value={
                                                          values.levels[index]
                                                            .titles[i]
                                                        }
                                                        marginTop="0px"
                                                        marginBottom="0px"
                                                      />
                                                      <Button
                                                        type="button"
                                                        onClick={() =>
                                                          arrayHelpers.remove(i)
                                                        }
                                                        marginTop="8px"
                                                      >
                                                        -
                                                      </Button>
                                                    </Pane>
                                                  </div>
                                                ))}
                                                <Button
                                                  type="button"
                                                  onClick={() =>
                                                    arrayHelpers.push("")
                                                  }
                                                  marginTop="8px"
                                                  appearance="minimal"
                                                >
                                                  + Add new title
                                                </Button>
                                              </Pane>
                                            )}
                                          />
                                        </Pane>
                                      </div>
                                    ))}

                                    <Pane
                                      display="flex"
                                      justifyContent="flex-end"
                                      marginTop="20px"
                                    >
                                      <Button
                                        onClick={() =>
                                          arrayHelpers.push({
                                            name: `Level ${
                                              values.levels.length + 1
                                            }`,
                                            titles: [""],
                                          })
                                        }
                                        type="button"
                                        appearance="main"
                                        paddingY="10px"
                                        paddingX="50px"
                                      >
                                        Add new level
                                      </Button>
                                    </Pane>
                                  </>
                                ) : null}
                              </div>
                            )}
                          />
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
                            currentStep === 1 ? handleNextSep : handleSubmit
                          }
                          appearance="main"
                          paddingY="20px"
                          paddingX="35px"
                          type="submit"
                        >
                          Next
                        </Button>
                      </Pane>
                    </Form>
                  );
                }}
              </Formik>
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
