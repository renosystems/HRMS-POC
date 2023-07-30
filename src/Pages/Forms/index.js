import {
  Pane,
  Button,
  Spinner,
  Paragraph,
  Dialog,
  TextInputField,
} from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import FormCard from "./Components/FormCard";
import {
  useGetFormsQuery,
  useAddNewFormMutation,
} from "../../Utils/RTK/slices/formApi.slice";
import { useState } from "react";

const Forms = () => {
  const [formName, setFormName] = useState("");
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const { data: forms, isLoading, isError } = useGetFormsQuery();
  const [AddNewForm, { isLoading: isAdding, isSuccess: isAdded }] =
    useAddNewFormMutation();

  const handleCreateForm = async (close) => {
    try {
    } catch (err) {
      console.log(err);
    }

    const res = await AddNewForm({
      name: formName,
    }).unwrap();

    setFormName("");
    close();

    navigate(`/forms/${res?.id}`);
  };

  const handleOpenCreateForm = () => {
    setIsShown(true);
  };

  const handleChangeFormName = (e) => {
    setFormName(e.target.value);
  };

  return (
    <Pane paddingY={20} paddingX={20}>
      <Button color="secondary" onClick={handleOpenCreateForm}>
        Create Form
      </Button>
      <Dialog
        isShown={isShown}
        title="Enter form name"
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
      >
        {({ close }) => (
          <Pane>
            <TextInputField
              name="formName"
              onChange={handleChangeFormName}
              value={formName}
            />
            <Button
              disabled={!formName}
              isLoading={isAdding}
              marginTop={16}
              onClick={() => handleCreateForm(close)}
            >
              Add
            </Button>
          </Pane>
        )}
      </Dialog>

      {/* List all forms */}
      <Pane
        marginTop={20}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
      >
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Paragraph color="red">Something went wrong</Paragraph>
        ) : (
          forms.map((item) => <FormCard key={item?.id} form={item} />)
        )}
      </Pane>
    </Pane>
  );
};

export default Forms;
