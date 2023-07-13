import { Label, Pane, SelectField } from "evergreen-ui";

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
      <SelectField
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
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {/* <Radio checked={value === option.name} label={option.name} /> */}
            {option.label}
          </option>
        ))}
      </SelectField>
    </Pane>
  );
};

export default HorisontalLabeledSelect;
