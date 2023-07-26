import { Pane, TextInput, Button, DeleteIcon, AddIcon } from "evergreen-ui";

const DropdownOptions = ({ options, setOptions, fullWidth }) => {
  const handleChange = (e, index) => {
    setOptions((prev) =>
      prev.map((o, i) => {
        if (i === index) {
          return e.target.value;
        }
        return o;
      })
    );
  };

  const handleDelete = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setOptions((prev) => [...prev, ""]);
  };

  return (
    <>
      {options.map((option, index) => (
        <Pane
          display="flex"
          // justifyContent="center"
          alignItems="center"
          key={index}
        >
          <TextInput
            label={`Option ${index + 1}`}
            value={option}
            fullWidth={fullWidth}
            onChange={(e) => handleChange(e, index)}
          />
          <DeleteIcon color="red" onClick={() => handleDelete(index)} />
        </Pane>
      ))}

      <Button
        marginY={8}
        marginRight={12}
        display="flex"
        alignItems="center"
        gap={2}
        iconBefore={AddIcon}
        onClick={handleAdd}
      >
        Add new Option
      </Button>
    </>
  );
};

export default DropdownOptions;
