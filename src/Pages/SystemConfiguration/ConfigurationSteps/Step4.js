import React, { useCallback } from "react";

/**
 * @param {Object} settings account settings details
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step4({ settings, nextStep, stepBackHandler }) {
  const handleNext = useCallback(() => {
    const newSettings = { ...settings, applicantForm: "detailed" };
    nextStep(newSettings, "step4");
  }, [nextStep, settings]);

  return (
    <>
      <h1>step4</h1>
      <p>{settings.applicantForm}</p>

      <button onClick={stepBackHandler}>back</button>
      <button onClick={handleNext}>Next</button>
    </>
  );
}

export default Step4;
