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
import { Navigate } from "react-router";

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
   * @param {String} step step
   * @returns
   */
  const handleNextSep = useCallback(
    (newSettings, step) => {
      if (newSettings) dispatch(updateAccountSettings(newSettings));

      if (config.currentStep === step) dispatch(updateConfiguration());
      else {
        const nextIndex = currentStep + 1;
        setCurrentStep(nextIndex);
      }
    },
    [config.currentStep, currentStep, dispatch]
  );

  useEffect(() => {
    setCurrentStep(config.currentStep);
  }, [config.currentStep]);

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
    if (config.completed) return <Navigate to="/" replace={true} />;

    switch (currentStep) {
      case 1:
        return <Step1 settings={settings} nextStep={handleNextSep} />;
      case 2:
        return (
          <Step2
            stepBackHandler={handleStepBack}
            settings={settings}
            nextStep={handleNextSep}
          />
        );
      case 3:
        return (
          <Step3
            stepBackHandler={handleStepBack}
            settings={settings}
            nextStep={handleNextSep}
          />
        );
      case 4:
        return (
          <Step4
            stepBackHandler={handleStepBack}
            settings={settings}
            nextStep={handleNextSep}
          />
        );

      case 5:
        return <Step5 nextStep={() => setCurrentStep(6)} />;

      case 6:
        return (
          <Step6
            nextStep={() => setCurrentStep(7)}
            stepBackHandler={handleStepBack}
          />
        );

      case 7:
        return <Step7 stepBackHandler={handleStepBack} />;

      default:
        return (
          <Pane>
            <Spinner marginX="auto" marginY={120} />
          </Pane>
        );
    }
  }
}

export default SystemConfiguration;
