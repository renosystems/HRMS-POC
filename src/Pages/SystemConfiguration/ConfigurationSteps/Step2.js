import React, { useCallback } from "react";

/**
 * @param {Object} settings account settings details
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step2({ settings, nextStep, stepBackHandler }) {
  const handleNext = useCallback(() => {
    const newSettings = { ...settings, hasApprovalCycle: true };
    nextStep(newSettings, "step2");
  }, [nextStep, settings]);

  return (
    <>
      <h1>step2</h1>
      <p>{settings.hasApprovalCycle}</p>

      <button onClick={stepBackHandler}>back</button>
      <button onClick={handleNext}>Next</button>
    </>
  );
}

export default Step2;
