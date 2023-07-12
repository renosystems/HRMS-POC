import React, { useCallback, useState } from "react";
import { Pane, Text, Heading, Radio, Button } from "evergreen-ui";

/**
 * @param {Object} settings account settings details
 * @param {Boolean} loading loading indicator
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step2({ settings, nextStep, stepBackHandler, loading }) {
  const [value, setValue] = useState(`${settings.hasApprovalCycle}` || "true");
  const [changed, setChanged] = useState(false);

  const handleChange = useCallback(
    (e) => {
      if (!changed) setChanged(true);
      setValue(e.target.value);
    },
    [changed]
  );

  const handleNext = useCallback(() => {
    const newSettings = changed
      ? {
          ...settings,
          hasApprovalCycle: value === "true" ? true : false,
        }
      : null;

    nextStep(newSettings, 2);
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

      <Heading>What's your current reqruitment work flow?</Heading>
      <Text
        paddingY="10px"
        textAlign="center"
        width="60%"
        size={300}
        color="muted"
      >
        Using the automated approval cycle will help you with the work flow of
        your forms and any created form will be automatically sent to the
        managers to get approved before it's sent to the HR for job posting
      </Text>

      <Pane
        role="group"
        display="flex"
        width="80%"
        justifyContent="space-around"
        marginTop="15px"
      >
        <Radio
          name="hasApproval"
          label="Continue without approval cycle"
          value="false"
          onChange={handleChange}
          fontWeight="900"
          checked={value === "false"}
          border="1px solid #D3D3D3"
          paddingX="20px"
          paddingY="15px"
          width="45%"
        />

        <Radio
          name="hasApproval"
          label="Use approval cycle"
          value="true"
          onChange={handleChange}
          fontWeight="900"
          checked={value === "true"}
          border="1px solid #D3D3D3"
          paddingX="20px"
          paddingY="15px"
          width="45%"
        />
      </Pane>

      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        width="100%"
        height="300px"
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

export default Step2;
