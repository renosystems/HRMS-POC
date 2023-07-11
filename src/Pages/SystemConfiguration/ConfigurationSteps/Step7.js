import React, { useCallback, useEffect, useState } from "react";
import {
  Pane,
  Text,
  Heading,
  Button,
  Spinner,
  NewGridItemIcon,
  Radio,
  TextInput,
} from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  getDepartments,
} from "../../../Utils/RTK/slices/departments.slice";
import { updateConfiguration } from "../../../Utils/RTK/slices/config.slice";

/**
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step7({ stepBackHandler }) {
  const { status, departments } = useSelector((state) => state.departments);
  const [isAddFirstClicked, setIsAddFirstClicked] = useState(false);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [order, setOrder] = useState("ascending");
  const [depName, setDepName] = useState("");

  const dispatch = useDispatch();

  const handleFinish = useCallback(() => {
    dispatch(updateConfiguration());
  }, [dispatch]);

  const handleNext = useCallback(() => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      dispatch(addDepartment({ order: order, name: depName }));
      setIsAddingDepartment(false);
    }
  }, [currentStep, depName, dispatch, order]);

  useEffect(() => {
    if (status === "idle") dispatch(getDepartments());
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
              {currentStep === 1 ? (
                <Pane aria-label="Radio Group Heirarchry levels" role="group">
                  <Radio
                    name="order"
                    label="Ascending Heirarchry levels"
                    value="ascending"
                    onChange={(e, checked) => checked && setOrder("ascending")}
                    fontWeight="900"
                  />
                  <Radio
                    name="order"
                    label="Descending Heirarchry levels"
                    value="descending"
                    onChange={(e, checked) => checked && setOrder("ascending")}
                  />
                </Pane>
              ) : (
                <Pane>
                  <TextInput
                    onChange={(e) => setDepName(e.target.value)}
                    value={depName}
                    placeholder="Department name"
                    width="100%"
                    marginBottom="20px"
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
                  onClick={handleNext}
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
