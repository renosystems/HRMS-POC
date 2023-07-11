import React, { useCallback, useEffect, useState } from "react";
import {
  Pane,
  Text,
  Heading,
  Button,
  Spinner,
  FileCard,
  FileUploader,
  TextInput,
} from "evergreen-ui";

import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getEmployees,
} from "../../../Utils/RTK/slices/employees.slice";
import { updateConfiguration } from "../../../Utils/RTK/slices/config.slice";

/**
 * @param {Object} nextStep next step handler fn
 * @param {Object} stepBackHandler back step handler fn
 * @returns
 */
function Step6({ nextStep, stepBackHandler }) {
  const { status, employees } = useSelector((state) => state.employees);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");

  const [isAddingManager, setIsAddingManager] = useState(false);
  const [isAddingExcutive, setIsAddingExcutive] = useState(false);

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

    nextStep();
  }, [dispatch, nextStep]);

  const handleAdd = useCallback(() => {
    dispatch(
      addEmployee({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        title: title,
        role: isAddingManager ? "manager" : "excutive",
      })
    );

    if (isAddingManager) setIsAddingManager(false);
    else setIsAddingExcutive(false);
  }, [dispatch, email, isAddingManager, name, phoneNumber, title]);

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
      width="85%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="default"
    >
      {!isAddingExcutive && !isAddingManager ? (
        <Pane
          minHeight="60vh"
          marginX="auto"
          paddingY="50px"
          paddingX="50px"
          width="40%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          background="gray300"
          border="default"
        >
          <Pane>
            <Heading>
              Add managers and excutives to your system, and upon it you will
              assign managers to departments
            </Heading>
            <Text paddingY="10px" size={300} color="muted">
              Please note that excutives are higher in the heirarchy
            </Text>
            <Button
              onClick={() => {
                setIsAddingManager(true);
              }}
              background="white"
              color="grey"
              width="100%"
              marginBottom="15px"
              marginTop="20px"
            >
              Add managers
            </Button>
            <Button
              onClick={() => {
                setIsAddingExcutive(true);
              }}
              background="white"
              color="grey"
              width="100%"
            >
              Add excutives
            </Button>
          </Pane>

          <Pane
            display="flex"
            justifyContent={employees.length ? "space-between" : "flex-start"}
            alignItems="flex-end"
            width="100%"
            padding="auto"
          >
            <Button
              onClick={stepBackHandler}
              appearance="default"
              paddingY="20px"
              paddingX="35px"
            >
              Back
            </Button>
            {employees.length ? (
              <Button
                onClick={handleNext}
                appearance="main"
                paddingY="20px"
                paddingX="35px"
              >
                Skip to departments
              </Button>
            ) : null}
          </Pane>
        </Pane>
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
          <Heading>Adding {isAddingManager ? "manager" : "excutive"}</Heading>
          <Text paddingY="10px" size={300} color="muted">
            Add your {isAddingManager ? "manager" : "excutive"} details
          </Text>

          <FileUploader
            label="Change profile image"
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
            placeholder="Phone Number"
            width="100%"
            marginBottom="20px"
          />
          <TextInput
            label="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            width="100%"
            marginBottom="20px"
          />

          <Pane display="flex" justifyContent="space-between" width="100%">
            <Button
              onClick={() => {
                isAddingManager
                  ? setIsAddingManager(false)
                  : setIsAddingExcutive(false);
              }}
              appearance="default"
              paddingY="20px"
              paddingX="35px"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
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

export default Step6;
