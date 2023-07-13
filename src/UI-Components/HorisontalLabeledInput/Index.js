import { Label, Pane, TextInputField } from "evergreen-ui";

const HorisontalLabeledInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  isInvalid,
  validationMessage,
  width,
  type,
  disabled,
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
      <TextInputField
        label=""
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        validationMessage={validationMessage}
        placeholder={placeholder}
        type={type}
        marginBottom="0px"
        width="60%"
        disabled={disabled}
      />
    </Pane>
  );
};

export default HorisontalLabeledInput;
