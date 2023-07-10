import React, { useCallback, useEffect, useState } from "react";
import { Pane, Spinner } from "evergreen-ui";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountSettings,
  updateAccountSettings,
} from "../../Utils/RTK/slices/accountSettings.slice";
import { updateConfiguration } from "../../Utils/RTK/slices/config.slice";
import Step1 from "./ConfigurationSteps/Step1";
import Step2 from "./ConfigurationSteps/Step2";
import Step3 from "./ConfigurationSteps/Step3";
import Step4 from "./ConfigurationSteps/Step4";
import Step5 from "./ConfigurationSteps/Step5";
import Step6 from "./ConfigurationSteps/Step6";
import Step7 from "./ConfigurationSteps/Step7";

/**
 * @returns component
 */
function SystemConfiguration() {
  const { config } = useSelector((state) => state.config);
  const { status, settings } = useSelector((state) => state.accountSettings);
  const [currentStep, setCurrentStep] = useState(null);
  const dispatch = useDispatch();

  const handleStepBack = useCallback(() => {
    const backIndex = currentStep - 1;
    setCurrentStep(backIndex);
  }, [currentStep]);

  /**
   * update account settings
   * update step status of completion
   * sets current step to the next one
   * @param {Object} newSettings new account settings details
   * @param {String} stepId step id
   * @returns
   */
  const handleNextSep = useCallback(
    (newSettings, stepId) => {
      if (newSettings) dispatch(updateAccountSettings(newSettings));

      if (!config.steps[stepId].completed)
        dispatch(updateConfiguration(stepId));

      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
    },
    [config.steps, currentStep, dispatch]
  );

  useEffect(() => {
    dispatch(getAccountSettings());
  }, [dispatch]);

  if (status === "idle" || status === "loading") {
    return (
      <Pane>
        <Spinner marginX="auto" marginY={120} />
      </Pane>
    );
  } else {
    if (!config.steps.step1.completed || currentStep === 1) {
      if (!currentStep) setCurrentStep(1);
      return <Step1 settings={settings} nextStep={handleNextSep} />;
    }

    if (!config.steps.step2.completed || currentStep === 2) {
      if (!currentStep) setCurrentStep(2);
      return (
        <Step2
          stepBackHandler={handleStepBack}
          settings={settings}
          nextStep={handleNextSep}
        />
      );
    }

    if (!config.steps.step3.completed || currentStep === 3) {
      if (!currentStep) setCurrentStep(3);
      return (
        <Step3
          stepBackHandler={handleStepBack}
          settings={settings}
          nextStep={handleNextSep}
        />
      );
    }

    if (!config.steps.step4.completed || currentStep === 4) {
      if (!currentStep) setCurrentStep(4);
      return (
        <Step4
          stepBackHandler={handleStepBack}
          settings={settings}
          nextStep={handleNextSep}
        />
      );
    }

    if (!config.steps.step5.completed || currentStep === 5) {
      if (!currentStep) setCurrentStep(5);
      return <Step5 nextStep={() => setCurrentStep(6)} />;
    }

    if (!config.steps.step6.completed || currentStep === 6) {
      if (!currentStep) setCurrentStep(6);
      return (
        <Step6
          nextStep={() => setCurrentStep(7)}
          stepBackHandler={handleStepBack}
        />
      );
    }

    if (!config.steps.step7.completed || currentStep === 7) {
      if (!currentStep) setCurrentStep(7);
      return (
        <Step7 nextStep={handleNextSep} stepBackHandler={handleStepBack} />
      );
    }
  }
}

export default SystemConfiguration;
