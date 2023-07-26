import { useState } from "react";
import {
  Pane,
  Button,
  Paragraph,
  ArrowLeftIcon,
  TextInput,
} from "evergreen-ui";
import DropdownOptions from "../../../../../UI-Components/DropdownOptions/DropdownOptions";
import { useAddNewDatasourceMutation } from "../../../../../Utils/RTK/slices/datasourceApiSlice.slice";

const CreateListHeadline = ({ closeCreateList }) => {
  return (
    <Pane display="flex" alignItems="center" gap={2} paddingX={2}>
      <Button
        onClick={closeCreateList}
        padding="3px"
        borderRadius="5px"
        backgroundColor="grey"
      >
        <ArrowLeftIcon />
      </Button>
      <Paragraph>Create List</Paragraph>
    </Pane>
  );
};

const CreateList = ({ closeCreateList }) => {
  const [listName, setListName] = useState("");
  const [options, setOptions] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [AddNewDatasource, { isLoading }] = useAddNewDatasourceMutation();

  const handleAddList = async () => {
    // reset error messages
    setErrorMessages({});

    let hasError = false;

    if (!listName) {
      setErrorMessages((prev) => ({
        ...prev,
        listName: "List name is required",
      }));
      hasError = true;
    }

    if (options.length === 0) {
      setErrorMessages((prev) => ({
        ...prev,
        options: "options are required",
      }));
      hasError = true;
    }

    if (options.length > 0) {
      const hasEmptyOption = options.some((option) => option === "");
      if (hasEmptyOption) {
        setErrorMessages((prev) => ({
          ...prev,
          options: "Pleas Add valid options",
        }));
        hasError = true;
      }
    }

    if (hasError) return;

    // create list
    const data = {
      name: listName,
      options,
    };

    // createDataSource
    try {
      await AddNewDatasource(data).unwrap();

      closeCreateList();

      // const errorMessage =
      //   error?.response?.data?.message || "Something went wrong";

      // console.log(errorMessage);
      // setErrorMessages((prev) => ({
      //   ...prev,
      //   listName: errorMessage,
      // }));
    } catch (err) {
      console.error("Failed to save: ", err);
    }
  };

  return (
    <Pane>
      <CreateListHeadline closeCreateList={closeCreateList} />
      <Pane display="flex" flexDirection="column" paddingX={10} paddingY={20}>
        <TextInput
          label="List Name"
          onChange={(e) => setListName(e.target.value)}
          value={listName}
          fullWidth
          marginBottom={errorMessages?.listName ? 5 : 20}
        />

        {errorMessages?.listName && (
          <Pane paddingY={5} marginBottom={20} color="red">
            {errorMessages?.listName}
          </Pane>
        )}

        <DropdownOptions
          options={options}
          setOptions={setOptions}
          fullWidth={true}
        />
        {errorMessages.options && (
          <Pane paddingY={5} color="red">
            {errorMessages.options}
          </Pane>
        )}

        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Button onClick={closeCreateList}>Cancel</Button>
          <Button onClick={handleAddList} isLoading={isLoading}>
            Save List
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default CreateList;
