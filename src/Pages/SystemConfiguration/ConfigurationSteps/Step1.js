import React, { useCallback, useState } from "react";
import { Pane, Text, Heading, RadioGroup, Button } from "evergreen-ui";

/**
 * @param {Object} settings account settings details
 * @param {Object} nextStep next step handler fn
 * @returns
 */
function Step1({ settings, nextStep }) {
  const [value, setValue] = useState(settings.rwf);
  const [changed, setChanged] = useState(false);

  const handleChange = useCallback(
    (e) => {
      if (!changed) setChanged(true);
      setValue(e.target.value);
    },
    [changed]
  );
  const handleNext = useCallback(() => {
    const newSettings = { ...settings, rwf: "hiringRequestSystem" };

    nextStep(newSettings, "step1");
  }, [nextStep, settings]);

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

      <RadioGroup
        value={value}
        options={[
          { label: "Job posting system", value: "jobPosting" },
          { label: "Hiring request and job post system", value: "Both" },
        ]}
        onChange={handleChange}
        display="flex"
        width="50%"
        justifyContent="space-between"
      />

      <Pane
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        width="100%"
        height="300px"
      >
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
  );
}

export default Step1;
