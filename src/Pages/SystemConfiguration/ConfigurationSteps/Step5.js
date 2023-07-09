import React, { useCallback, useEffect, useState } from "react";
import { Pane, Text, Heading, Button, PeopleIcon, Spinner } from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../Utils/RTK/slices/employees.slice";

/**
 * @param {Object} settings account settings details
 * @param {Object} nextStep next step handler fn
 * @returns
 */
function Step5({ settings, nextStep }) {
  const { status, ceo, managers, excutives } = useSelector(
    (state) => state.employees
  );

  const [isSetupClicked, setIsSetupClicked] = useState(false);

  const dispatch = useDispatch();

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
      paddingY="70px"
      paddingX="50px"
      width="60%"
      height="60vh"
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
        "add CEO"
      )}
    </Pane>
  );
}

export default Step5;
