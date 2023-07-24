import { Pane, Button, Paragraph, ArrowLeftIcon } from "evergreen-ui";

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
  return (
    <>
      <CreateListHeadline closeCreateList={closeCreateList} />
    </>
  );
};

export default CreateList;
