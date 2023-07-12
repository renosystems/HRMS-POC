import { Label, Pane, Select } from "evergreen-ui";

const HorisontalLabeledSelect = ({
  label,
  name,
  value,
  onChange,
  isInvalid,
  validationMessage,
  width,
  options,
}) => {
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingY="10px"
      width={width}
    >
      <Label fontSize="12px" fontWeight={700}>
        {label}
      </Label>
      <Select
        label=""
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        validationMessage={validationMessage}
        width="60%"
        flex={null}
        borderRadius="5px"
        marginBottom="0px"
        backgroundColor="white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {/* <Radio checked={value === option.name} label={option.name} /> */}
            {option.label}
          </option>
        ))}
      </Select>
    </Pane>
  );
};

export default HorisontalLabeledSelect;
