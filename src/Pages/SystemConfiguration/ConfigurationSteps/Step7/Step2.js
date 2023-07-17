import {
  Pane,
  Text,
  Heading,
  Button,
  TextInputField,
  SelectField,
} from "evergreen-ui";

import { FieldArray } from "formik";

import HorisontalLabeledInput from "../../../../UI-Components/HorisontalLabeledInput/Index";
import HorisontalLabeledSelect from "../../../../UI-Components/HorisontalLabeledSelect/Index";

/**
 * @param {Object} values form values
 * @param {Object} errors form errors
 * @param {Object} touched
 * @param {Array} managers array of existing managers
 * @param {Array} excutives array of existing excutives
 * @param {Array} levelsList array of levels
 * @param {Function} handleFieldChange change form field handler
 * @param {Function} handleChangeLevel change level handler
 * @param {Function} handleRemoveTitle remove title handler
 * @param {Function} handleAddNewLevel add new level handler
 * @returns
 */
const Step2 = ({
  values,
  errors,
  touched,
  managers,
  excutives,
  levelsList,
  handleFieldChange,
  handleChangeLevel,
  handleRemoveTitle,
  handleAddNewLevel,
}) => {
  return (
    <Pane>
      <HorisontalLabeledInput
        label="Department Name"
        name="name"
        value={values.name}
        onChange={handleFieldChange}
        isInvalid={touched.name && Boolean(errors.name)}
        validationMessage={touched.name && errors.name}
        placeholder="Name"
        type="text"
        width="100%"
      />

      <HorisontalLabeledSelect
        label="Manager"
        name="manager"
        value={values.manager}
        onChange={handleFieldChange}
        isInvalid={touched.manager && Boolean(errors.manager)}
        validationMessage={touched.manager && errors.manager}
        options={[
          { label: "none", value: "" },
          ...managers.map((manager) => ({
            label: manager.name,
            value: manager.name,
          })),
        ]}
        width="100%"
      />

      <HorisontalLabeledSelect
        label="Report to"
        name="excutive"
        value={values.excutive}
        onChange={handleFieldChange}
        isInvalid={touched.excutive && Boolean(errors.excutive)}
        validationMessage={touched.excutive && errors.excutive}
        options={[
          { label: "none", value: "" },
          ...excutives.map((manager) => ({
            label: manager.name,
            value: manager.name,
          })),
        ]}
        width="100%"
      />

      <hr style={{ width: "100%" }} />

      <Heading>Department titles</Heading>
      <Text>Ascending or descending based on your company's Heirarchry</Text>

      <FieldArray
        name="levels"
        render={(arrayHelpers) => (
          <div>
            {values.levels ? (
              <>
                {values.levels?.map((lvl, index) => (
                  <div key={index}>
                    <Pane
                      display="flex"
                      justifyContent="space-between"
                      marginBottom="20px"
                    >
                      <SelectField
                        name={`levels.${index}.id`}
                        value={lvl.id}
                        label=""
                        onChange={(e) => handleChangeLevel(e, lvl, index)}
                      >
                        {levelsList.map((l) => (
                          <option
                            key={l.id}
                            value={l.id}
                            disabled={l.selected}
                            style={{
                              backgroundColor: l.selected ? "#edeff5" : "white",
                            }}
                          >
                            level {l.id}
                          </option>
                        ))}
                      </SelectField>

                      <FieldArray
                        name={`levels.${index}.titles`}
                        render={(arrayHelpers) => (
                          <Pane display="flex" flexDirection="column">
                            {values.levels[index]?.titles?.map((title, i) => (
                              <div key={i}>
                                <Pane display="flex">
                                  <TextInputField
                                    name={`levels.${index}.titles.${i}`}
                                    onChange={handleFieldChange}
                                    value={values.levels[index].titles[i]}
                                    isInvalid={
                                      touched?.levels &&
                                      errors?.levels &&
                                      typeof errors?.levels !== "string" &&
                                      errors?.levels[index]?.titles &&
                                      Boolean(errors?.levels[index]?.titles[i])
                                    }
                                    validationMessage={
                                      touched?.levels &&
                                      errors?.levels &&
                                      typeof errors?.levels !== "string" &&
                                      errors?.levels[index]?.titles &&
                                      errors?.levels[index]?.titles[i]
                                    }
                                    marginTop="0px"
                                    marginBottom="0px"
                                  />
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      handleRemoveTitle(
                                        i,
                                        index,
                                        lvl,
                                        arrayHelpers
                                      );
                                    }}
                                    marginTop="8px"
                                  >
                                    -
                                  </Button>
                                </Pane>
                              </div>
                            ))}
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              marginTop="8px"
                              appearance="minimal"
                            >
                              + Add new title
                            </Button>
                          </Pane>
                        )}
                      />
                    </Pane>
                  </div>
                ))}

                <Pane display="flex" justifyContent="flex-end" marginTop="20px">
                  <Button
                    onClick={() => handleAddNewLevel(arrayHelpers)}
                    type="button"
                    appearance="main"
                    paddingY="10px"
                    paddingX="50px"
                  >
                    Add new level
                  </Button>
                </Pane>
              </>
            ) : null}
          </div>
        )}
      />
    </Pane>
  );
};

export default Step2;
