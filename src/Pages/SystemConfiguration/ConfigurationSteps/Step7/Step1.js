import { Pane, Text, Radio, TextInputField } from "evergreen-ui";

/**
 * @param {String} order order value
 * @param {String} handleChangeOrder change order handler
 * @param {Number} maxLevel maxLevel value
 * @param {Boolean} isMaxLevelTouched maxLevel formik touched indicator
 * @param {String} maxLevelError maxLevel formik error
 * @returns
 */
const Step1 = ({
  order,
  handleChangeOrder,
  maxLevel,
  isMaxLevelTouched,
  maxLevelError,
  handleChangeMaxLevel,
}) => {
  return (
    <Pane>
      <Pane aria-label="Radio Group Heirarchry levels" role="group">
        <Radio
          name="order"
          label="Ascending Heirarchry levels"
          value="ascending"
          onChange={() => handleChangeOrder("ascending")}
          fontWeight="900"
          checked={order === "ascending"}
        />
        <Pane
          width="80%"
          paddingX="15px"
          paddingY="15px"
          marginY="10px"
          backgroundColor="white"
        >
          <Pane display="flex" justifyContent="space-between" marginY="5px">
            <Pane display="flex" flexDirection="column">
              <Text>Level 1</Text>
              <Text>Level 2</Text>
              <Text>Level 3</Text>
            </Pane>
            <Pane display="flex" flexDirection="column">
              <Text>Department manager</Text>
              <Text>Team Leader</Text>
              <Text>Jr developer</Text>
            </Pane>
          </Pane>
        </Pane>
        <Radio
          name="order"
          label="Descending Heirarchry levels"
          value="descending"
          onChange={() => handleChangeOrder("descending")}
          checked={order === "descending"}
        />
        <Pane
          width="80%"
          paddingX="15px"
          paddingY="15px"
          marginY="10px"
          backgroundColor="white"
        >
          <Pane display="flex" justifyContent="space-between" marginY="5px">
            <Pane display="flex" flexDirection="column">
              <Text>Level 3</Text>
              <Text>Level 2</Text>
              <Text>Level 1</Text>
            </Pane>
            <Pane display="flex" flexDirection="column">
              <Text>Department manager</Text>
              <Text>Team Leader</Text>
              <Text>Jr developer</Text>
            </Pane>
          </Pane>
        </Pane>
      </Pane>

      <TextInputField
        label="Maximum level number"
        name="maxLevel"
        value={maxLevel}
        isInvalid={isMaxLevelTouched && Boolean(maxLevelError)}
        validationMessage={isMaxLevelTouched && maxLevelError}
        onChange={handleChangeMaxLevel}
        type="number"
        max={100}
        min={1}
      />
    </Pane>
  );
};

export default Step1;
