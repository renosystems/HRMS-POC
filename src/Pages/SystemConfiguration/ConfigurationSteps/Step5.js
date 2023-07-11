import React, { useCallback, useEffect, useState } from "react";
import {
  Pane,
  Text,
  Heading,
  Button,
  PeopleIcon,
  Spinner,
  FileCard,
  FileUploader,
  TextInput,
} from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import {
  addCeo,
  getEmployees,
} from "../../../Utils/RTK/slices/employees.slice";
import { updateConfiguration } from "../../../Utils/RTK/slices/config.slice";

/**
 * @param {Object} nextStep next step handler fn
 * @returns
 */
function Step5({ nextStep }) {
  const { status, ceo } = useSelector((state) => state.employees);
  const [name, setName] = useState(ceo ? ceo.name : "");
  const [email, setEmail] = useState(ceo ? ceo.email : "");
  const [phoneNumber, setPhoneNumber] = useState(ceo ? ceo.phoneNumber : "");

  const [isSetupClicked, setIsSetupClicked] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);
  const handleChange = useCallback((files) => setFiles([files[0]]), []);
  const handleRejected = useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);

  const dispatch = useDispatch();

  const handleNext = useCallback(() => {
    dispatch(updateConfiguration());

    dispatch(
      addCeo({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        title: "ceo",
        department: "Top management",
      })
    );

    nextStep();
  }, [dispatch, email, name, nextStep, phoneNumber]);

  useEffect(() => {
    if (status === "idle") dispatch(getEmployees());
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") {
    return (
      <Pane>
        <Spinner marginX="auto" marginY={120} />
      </Pane>
    );
  }

  return (
    <Pane
      marginTop="50px"
      marginX="auto"
      paddingX="50px"
      paddingY="30px"
      height={!isSetupClicked && !ceo ? "60vh" : "auto"}
      width="85%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="default"
    >
      {!isSetupClicked && !ceo ? (
        <>
          <PeopleIcon size={50} color="muted" marginBottom="10px" />
          <Heading>
            Start building up your employnment management system
          </Heading>
          <Text paddingY="10px" size={300} color="muted">
            Add employees and departments to your HRMS
          </Text>
          <Button
            onClick={() => {
              setIsSetupClicked(true);
            }}
            appearance="main"
            paddingY="20px"
            paddingX="35px"
            marginTop="20px"
          >
            Setup your employees management
          </Button>
        </>
      ) : (
        <Pane
          marginX="auto"
          paddingY="50px"
          paddingX="50px"
          width="40%"
          display="flex"
          flexDirection="column"
          background="gray300"
          border="default"
        >
          <Heading>
            Before you start adding departments and users, add your CEO to the
            top management department
          </Heading>
          <Text paddingY="10px" size={300} color="muted">
            This step is created by default and your CEO is added to the top
            management department
          </Text>

          <FileUploader
            label="Change your profile image"
            maxSizeInBytes={50 * 1024 ** 2}
            maxFiles={1}
            onChange={handleChange}
            onRejected={handleRejected}
            renderFile={(file) => {
              const { name, size, type } = file;
              const fileRejection = fileRejections.find(
                (fileRejection) => fileRejection.file === file
              );
              const { message } = fileRejection || {};
              return (
                <FileCard
                  key={name}
                  isInvalid={fileRejection != null}
                  name={name}
                  onRemove={handleRemove}
                  sizeInBytes={size}
                  type={type}
                  validationMessage={message}
                />
              );
            }}
            values={files}
          />

          <TextInput
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            width="100%"
            marginBottom="20px"
          />

          <TextInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
            type="email"
            width="100%"
            marginBottom="20px"
          />
          <TextInput
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="phoneNumber"
            width="100%"
            marginBottom="20px"
          />
          <TextInput
            label="title"
            value="ceo"
            disabled={true}
            width="100%"
            marginBottom="20px"
          />
          <TextInput
            label="title"
            value="Top Management"
            disabled={true}
            width="100%"
            marginBottom="20px"
          />

          <Pane
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            width="100%"
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
      )}
    </Pane>
  );
}

export default Step5;
