import React, { useCallback, useEffect, useState } from "react";
import {
  Pane,
  Text,
  Heading,
  Button,
  Spinner,
  NewGridItemIcon,
  Radio,
  TextInputField,
  SelectField,
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
  maxLevel: yup
    .number()
    .max(50, "Maximum number is 50")
    .min(1, "Minimum number is 1")
    .required("This field is required"),
  name: yup
    .string()
    .min(5, "Minimum five characters")
    .max(15, "Maximam fifteen characters")
    .required("This field is required"),

  manager: yup.string().when("excutive", {
    is: (value) => value === undefined,
    then: () =>
      yup.string().required("Manager can't be none when excutive is also none"),
    otherwise: () => yup.string(),
  }),

  excutive: yup.string(),
  levels: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        titles: yup
          .array()
          .of(
            yup
              .string("This field must include characters")
              .min(5, "Minimum five characters")
              .required("This field is required")
          ),
      })
    ),
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
  const [levelsList, setLevelsList] = useState([{ id: 1, selected: false }]);

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
                  maxLevel: 1,
                  name: "",
                  manager: "",
                  excutive: "",
                  levels: [],
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(addDepartment({ ...values }));
                  setIsAddingDepartment(false);
                  setCurrentStep(1);
                  setTouched(false);
                }}
              >
                {({
                  values,
                  setFieldValue,
                  errors,
                  touched: formikTouched,
                  handleSubmit,
                  handleChange,
                }) => {
                  const handleFieldChange = (e) => {
                    if (!touched) setTouched(true);
                    handleChange(e);
                  };

                  const handleChangeMaxLevel = (e) => {
                    if (e.target.value) {
                      const newValue = Number(e.target.value);
                      let newLevelsList = [...levelsList];

                      if (newValue > values.maxLevel) {
                        for (let i = values.maxLevel + 1; i <= newValue; i++) {
                          newLevelsList.push({ id: i, selected: false });
                        }
                      } else {
                        newLevelsList = newLevelsList.filter(
                          (l) => l.id <= newValue
                        );

                        setFieldValue(
                          "levels",
                          values.levels.filter((l) => l.id <= newValue)
                        );
                      }

                      setLevelsList(newLevelsList);
                      handleChange(e);
                    }
                  };

                  console.log(values);
                  console.log(levelsList);
                  return (
                    <>
                      <Form>
                        {currentStep === 1 ? (
                          <Pane>
                            <Pane
                              aria-label="Radio Group Heirarchry levels"
                              role="group"
                            >
                              <Radio
                                name="order"
                                label="Ascending Heirarchry levels"
                                value="ascending"
                                onChange={() =>
                                  setFieldValue("order", "ascending")
                                }
                                fontWeight="900"
                                checked={values.order === "ascending"}
                              />
                              <Pane
                                width="80%"
                                paddingX="15px"
                                paddingY="15px"
                                marginY="10px"
                                backgroundColor="white"
                              >
                                <Pane
                                  display="flex"
                                  justifyContent="space-between"
                                  marginY="5px"
                                >
                                  <Pane display="flex" flexDirection="column">
                                    <Text>Level 1</Text>
                                    <Text>Level 2</Text>
                                    <Text>Level 3</Text>
                                  </Pane>
                                  <Pane display="flex" flexDirection="column">
                                    <Text>Department manager</Text>
                                    <Text>Team Leader</Text>
                                    <Text>Jr developer</Text>
                                  </Pane>
                                </Pane>
                              </Pane>
                              <Radio
                                name="order"
                                label="Descending Heirarchry levels"
                                value="descending"
                                onChange={() =>
                                  setFieldValue("order", "descending")
                                }
                                checked={values.order === "descending"}
                              />
                              <Pane
                                width="80%"
                                paddingX="15px"
                                paddingY="15px"
                                marginY="10px"
                                backgroundColor="white"
                              >
                                <Pane
                                  display="flex"
                                  justifyContent="space-between"
                                  marginY="5px"
                                >
                                  <Pane display="flex" flexDirection="column">
                                    <Text>Level 3</Text>
                                    <Text>Level 2</Text>
                                    <Text>Level 1</Text>
                                  </Pane>
                                  <Pane display="flex" flexDirection="column">
                                    <Text>Department manager</Text>
                                    <Text>Team Leader</Text>
                                    <Text>Jr developer</Text>
                                  </Pane>
                                </Pane>
                              </Pane>
                            </Pane>

                            <TextInputField
                              label="Maximum level number"
                              name="maxLevel"
                              value={values.maxLevel}
                              isInvalid={
                                formikTouched.maxLevel &&
                                Boolean(errors.maxLevel)
                              }
                              validationMessage={
                                formikTouched.maxLevel && errors.maxLevel
                              }
                              onChange={handleChangeMaxLevel}
                              type="number"
                              max={100}
                              min={1}
                            />
                          </Pane>
                        ) : (
                          <Pane>
                            <HorisontalLabeledInput
                              label="Department Name"
                              name="name"
                              value={values.name}
                              onChange={handleFieldChange}
                              isInvalid={
                                formikTouched.name && Boolean(errors.name)
                              }
                              validationMessage={
                                formikTouched.name && errors.name
                              }
                              placeholder="Name"
                              type="text"
                              width="100%"
                            />

                            <HorisontalLabeledSelect
                              label="Manager"
                              name="manager"
                              value={values.manager}
                              onChange={handleFieldChange}
                              isInvalid={
                                formikTouched.manager && Boolean(errors.manager)
                              }
                              validationMessage={
                                formikTouched.manager && errors.manager
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
                              isInvalid={
                                formikTouched.excutive &&
                                Boolean(errors.excutive)
                              }
                              validationMessage={
                                formikTouched.excutive && errors.excutive
                              }
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
                                      {values.levels?.map((lvl, index) => (
                                        <div key={index}>
                                          <Pane
                                            display="flex"
                                            justifyContent="space-between"
                                            marginBottom="20px"
                                          >
                                            <SelectField
                                              name={`levels.${index}.id`}
                                              value={lvl.id}
                                              label=""
                                              onChange={(e) => {
                                                const selected =
                                                  levelsList.find(
                                                    (l) =>
                                                      l.id ===
                                                      Number(e.target.value)
                                                  ).selected;
                                                if (!selected) {
                                                  const currentValue = lvl.id;
                                                  setLevelsList((prev) =>
                                                    prev.map((l) =>
                                                      l.id ===
                                                      Number(e.target.value)
                                                        ? {
                                                            id: l.id,
                                                            selected: true,
                                                          }
                                                        : l.id === currentValue
                                                        ? {
                                                            id: l.id,
                                                            selected: false,
                                                          }
                                                        : l
                                                    )
                                                  );
                                                  setFieldValue(
                                                    `levels.${index}.id`,
                                                    Number(e.target.value)
                                                  );
                                                }
                                              }}
                                            >
                                              {levelsList.map((l) => (
                                                <option key={l.id} value={l.id}>
                                                  level {l.id}
                                                </option>
                                              ))}
                                            </SelectField>

                                            <FieldArray
                                              name={`levels.${index}.titles`}
                                              render={(arrayHelpers) => (
                                                <Pane
                                                  display="flex"
                                                  flexDirection="column"
                                                >
                                                  {values.levels[
                                                    index
                                                  ].titles?.map((title, i) => (
                                                    <div key={i}>
                                                      <Pane display="flex">
                                                        <TextInputField
                                                          name={`levels.${index}.titles.${i}`}
                                                          onChange={
                                                            handleChange
                                                          }
                                                          value={
                                                            values.levels[index]
                                                              .titles[i]
                                                          }
                                                          isInvalid={
                                                            formikTouched.levels &&
                                                            errors.levels &&
                                                            typeof errors.levels !==
                                                              "string" &&
                                                            Boolean(
                                                              errors.levels[
                                                                index
                                                              ]?.titles[i]
                                                            )
                                                          }
                                                          validationMessage={
                                                            formikTouched.levels &&
                                                            errors.levels &&
                                                            typeof errors.levels !==
                                                              "string" &&
                                                            errors.levels[index]
                                                              ?.titles[i]
                                                          }
                                                          marginTop="0px"
                                                          marginBottom="0px"
                                                        />
                                                        <Button
                                                          type="button"
                                                          onClick={() => {
                                                            if (
                                                              i === 0 &&
                                                              index === 0 &&
                                                              values.levels
                                                                .length === 1
                                                            )
                                                              return;

                                                            arrayHelpers.remove(
                                                              i
                                                            );

                                                            if (i === 0) {
                                                              setFieldValue(
                                                                "levels",
                                                                values.levels.filter(
                                                                  (level) =>
                                                                    level.id !==
                                                                    lvl.id
                                                                )
                                                              );

                                                              setLevelsList(
                                                                (prev) =>
                                                                  prev.map(
                                                                    (l) =>
                                                                      l.id ===
                                                                      lvl.id
                                                                        ? {
                                                                            ...l,
                                                                            selected: false,
                                                                          }
                                                                        : l
                                                                  )
                                                              );
                                                            }
                                                          }}
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
                                          onClick={() => {
                                            if (
                                              levelsList.length !==
                                              values.levels.length
                                            ) {
                                              function getId(list) {
                                                return list.find(
                                                  (l) => !l.selected
                                                ).id;
                                              }
                                              const lvlId = getId(levelsList);
                                              arrayHelpers.push({
                                                id: lvlId,
                                                titles: [""],
                                              });

                                              setLevelsList((prev) =>
                                                prev.map((l) =>
                                                  l.id === lvlId
                                                    ? {
                                                        id: l.id,
                                                        selected: true,
                                                      }
                                                    : l
                                                )
                                              );
                                            }
                                          }}
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

                        {currentStep !== 1 ? (
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
                                setCurrentStep(1);
                              }}
                              appearance="default"
                              paddingY="20px"
                              paddingX="35px"
                            >
                              Back
                            </Button>

                            <Button
                              onClick={handleSubmit}
                              appearance="main"
                              paddingY="20px"
                              paddingX="35px"
                              type="submit"
                            >
                              Next
                            </Button>
                          </Pane>
                        ) : null}
                      </Form>
                      {currentStep === 1 ? (
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
                              setIsAddFirstClicked(false);
                              setIsAddingDepartment(false);
                            }}
                            appearance="default"
                            paddingY="20px"
                            paddingX="35px"
                          >
                            Back
                          </Button>

                          <Button
                            onClick={handleNextSep}
                            appearance="main"
                            paddingY="20px"
                            paddingX="35px"
                            type="button"
                          >
                            Next
                          </Button>
                        </Pane>
                      ) : null}
                    </>
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
                  onClick={stepBackHandler}
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
