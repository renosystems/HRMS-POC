import React, { useCallback } from "react";

/**
 * @param {Object} settings account settings details
 * @param {Object} nextStep next step handler fn
 * @returns
 */
function Step1({ settings, nextStep }) {
  const handleNext = useCallback(() => {
    const newSettings = { ...settings, rwf: "hiringRequestSystem" };

    nextStep(newSettings, "step1");
  }, [nextStep, settings]);

  return (
    <>
      <h1>step1</h1>
      <p>{settings.rwf}</p>

      <button onClick={handleNext}>Next</button>
    </>
  );
}

export default Step1;
