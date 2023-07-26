import { useEffect, useState } from "react";
import { Pane, Button, TextInput, Heading, ArrowLeftIcon } from "evergreen-ui";
import DropdownOptions from "../../../../../UI-Components/DropdownOptions/DropdownOptions";
import {
  useUpdateDatasourceMutation,
  useDeleteDatasourceMutation,
} from "../../../../../Utils/RTK/slices/datasourceApiSlice.slice";
import { useDataSourceContext } from "../../../../../Utils/Context/DataSourceContext";

const EditListHeadline = ({ handleCloseEditList }) => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      gap={2}
      paddingX={10}
      paddingY={10}
    >
      <Button
        onClick={handleCloseEditList}
        paddingX="3px"
        paddingY="3px"
        borderRadius="5px"
        backgroundColor="grey"
      >
        <ArrowLeftIcon />
      </Button>
      <Heading fontWeight="600" color="grey">
        Edit List
      </Heading>
    </Pane>
  );
};

const EditList = () => {
  const dataSourceContext = useDataSourceContext();
  const { listToEdit, setListToEdit } = dataSourceContext;
  const [updateDatasource, { isLoading }] = useUpdateDatasourceMutation();
  const [deleteDatasource, { isLoading: isDeleting }] =
    useDeleteDatasourceMutation();

  const [listName, setListName] = useState(listToEdit?.name ?? "");
  const [options, setOptions] = useState(listToEdit?.options ?? []);
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    if (listToEdit) {
      setListName(listToEdit.name);
      setOptions(listToEdit.options);
    }
  }, [listToEdit]);

  const handleCloseEditList = () => {
    setListToEdit(null);
  };

  const handleEditList = async () => {
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
      data: { options, name: listName },
      id: listToEdit.id,
    };

    // editDataSourceMutation
    try {
      await updateDatasource(data).unwrap();

      handleCloseEditList();
    } catch (err) {
      console.error("Failed to save: ", err);
      setErrorMessages((prev) => ({
        ...prev,
        listName: err?.response?.data?.message || "Something went wrong",
      }));
    }
  };

  const handleDeleteList = async () => {
    try {
      await deleteDatasource(listToEdit.id).unwrap();

      handleCloseEditList();
    } catch (err) {
      console.error("Failed to save: ", err);
      setErrorMessages((prev) => ({
        ...prev,
        listName: err?.response?.data?.message || "Something went wrong",
      }));
    }
  };

  return (
    <Pane>
      <EditListHeadline handleCloseEditList={handleCloseEditList} />
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
          <Button onClick={handleDeleteList} loading={isDeleting}>
            Delete
          </Button>
          <Pane display="flex" gap={1}>
            <Button onClick={handleCloseEditList}>Cancel</Button>
            <Button onClick={handleEditList} loading={isLoading}>
              Save List
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default EditList;
