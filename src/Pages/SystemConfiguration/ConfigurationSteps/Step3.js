import React, { useCallback, useState } from "react";
import { Pane, Text, Heading, RadioGroup, Button } from "evergreen-ui";
/**
 * @param {Object} settings account settings details
 * @param {Boolean} loading loading indicator
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step3({ settings, nextStep, stepBackHandler, loading }) {
  const [value, setValue] = useState(settings.approvalCycle);
  const [changed, setChanged] = useState(false);

  const handleChange = useCallback(
    (e) => {
      if (!changed) setChanged(true);
      setValue(e.target.value);
    },
    [changed]
  );

  const handleNext = useCallback(() => {
    const newSettings = changed ? { ...settings, approvalCycle: value } : null;

    nextStep(newSettings, 3);
  }, [changed, nextStep, settings, value]);

  return (
    <Pane
      marginTop="50px"
      marginX="auto"
      paddingY="70px"
      paddingX="50px"
      width="60%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="default"
    >
      <Heading>Let's get started configuring your system</Heading>
      <Text paddingY="10px" size={300} color="muted">
        We'll help you get setup based on your business needs
      </Text>

      <hr style={{ width: "100%", color: "#E6E8F0", margin: "20px 0px" }} />

      <Heading>
        Would you like to implement approval cycle for job post, hiring request
        or both
      </Heading>
      <Text
        paddingY="10px"
        textAlign="center"
        width="60%"
        size={300}
        color="muted"
      >
        Making approval cycle for the hiring request, job post or both pf them
      </Text>

      <Pane display="flex" justifyContent="center" width="50%">
        <RadioGroup
          value={value}
          options={[
            {
              label: "Only Hiring request approval cycle",
              value: "hiringRequest",
            },
            { label: "Only job post approval cycle", value: "jobPost" },
            { label: "Approval cycle for both", value: "both" },
          ]}
          onChange={handleChange}
          display="flex"
          flexDirection="column"
          width="50%"
        />
      </Pane>

      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        width="100%"
        height="100px"
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
          onClick={handleNext}
          isLoading={loading}
          appearance="main"
          paddingY="20px"
          paddingX="35px"
        >
          Next
        </Button>
      </Pane>
    </Pane>
  );
}

export default Step3;
