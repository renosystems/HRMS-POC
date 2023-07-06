import React, { useCallback } from "react";

/**
 * @param {Object} settings account settings details
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step3({ settings, nextStep, stepBackHandler }) {
  const handleNext = useCallback(() => {
    const newSettings = { ...settings, approvalCycle: "onlyHiringRequest" };
    nextStep(newSettings, "step3");
  }, [nextStep, settings]);

  return (
    <>
      <h1>step3</h1>
      <p>{settings.approvalCycle}</p>

      <button onClick={stepBackHandler}>back</button>
      <button onClick={handleNext}>Next</button>
    </>
  );
}

export default Step3;
