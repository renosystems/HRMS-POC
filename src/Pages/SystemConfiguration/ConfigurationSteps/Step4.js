import React, { useCallback, useState } from "react";
import { Pane, Text, Heading, RadioGroup, Button } from "evergreen-ui";
/**
 * @param {Object} settings account settings details
 * @param {Boolean} loading loading indicator
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step4({ settings, nextStep, stepBackHandler, loading }) {
  const [value, setValue] = useState(settings.applicantForm);
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
          applicantForm: value,
        }
      : null;

    nextStep(newSettings, 4);
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

      <Heading>Do you want a simple or detailed form?</Heading>
      <Text
        paddingY="10px"
        textAlign="center"
        width="60%"
        size={300}
        color="muted"
      >
        Simple applicat form is easier for the applicants where they fill basic
        information and upload a CV. Detailed applicant forms is better for
        statistics to the HR
      </Text>

      <RadioGroup
        value={value}
        options={[
          { label: "Basic applicant form", value: "Basic" },
          { label: "Detailed applicant form", value: "detailed" },
        ]}
        onChange={handleChange}
        display="flex"
        width="50%"
        justifyContent="space-between"
      />

      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        width="100%"
        height="200px"
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
          Finish and go to dashboard
        </Button>
      </Pane>
    </Pane>
  );
}

export default Step4;
