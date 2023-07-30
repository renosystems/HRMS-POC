import {
  Pane,
  ArrowLeftIcon,
  Button,
  Paragraph,
  TextInput,
  // DeleteIcon,
  // AddIcon,
  SelectField,
  TextInputField,
} from "evergreen-ui";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDataSourceContext } from "../../../../Utils/Context/DataSourceContext";
import { useGetDatasourcesQuery } from "../../../../Utils/RTK/slices/datasourceApiSlice.slice";
import { LIST_TAB } from "../../../../Utils/constants";
import { useAddNewFieldMutation } from "../../../../Utils/RTK/slices/fieldsApi.slice";

// const arrayEquals = (a, b) => {
//   return (
//     Array.isArray(a) &&
//     Array.isArray(b) &&
//     a.length === b.length &&
//     a.every((val, index) => val === b[index])
//   );
// };

const validationSchema = yup.object().shape({
  fieldName: yup
    .string()
    .min(5, "Minimum five characters")
    .max(15, "Maximam fifteen characters")
    .required("This field is required"),
  fieldType: yup.string().required("This field is required"),

  dataSource: yup.string().required("This field is required"),
});

const DropDownOptions = ({ options, setFieldValue }) => {
  // const handleChangeOption = (e, index) => {
  //   options[index] = e.target.value;

  //   setFieldValue("options", [...options]);
  // };
  return (
    <>
      {/* Dropdown select */}
      {options.map((item, index) => (
        <Pane display="flex" key={index} marginY={10} alignItems="center">
          <TextInput
            label={`Option ${index + 1}`}
            value={item}
            disabled
            // onChange={handleChangeOption}
          />

          {/* <DeleteIcon
            onClick={() =>
              setFieldValue(
                "options",
                options.filter((_, i) => i !== index)
              )
            }
            color="red"
          /> */}
        </Pane>
      ))}
      {/* <Pane>
        <Button
          display="flex"
          alignItems="center"
          onClick={() => {
            if (options.length === 1) return;
            setFieldValue("options", [...options, ""]);
          }}
        >
          <AddIcon color="green" />
          Add new Option
        </Button>
      </Pane> */}
    </>
  );
};

const CreateFieldHeadline = ({ closeCreateField }) => {
  return (
    <Pane display="flex" alignItems="center" gap={2} paddingX={2}>
      <Button
        onClick={closeCreateField}
        padding="3px"
        borderRadius="5px"
        backgroundColor="grey"
      >
        <ArrowLeftIcon />
      </Button>
      <Paragraph>Create Field</Paragraph>
    </Pane>
  );
};

const FieldTab = () => {
  const { setCurrentTab } = useDataSourceContext();

  const {
    data: dataSources,
    // isLoading,
    // isError,
    // error,
  } = useGetDatasourcesQuery();

  const [AddNewField, { isLoading: isAdding }] = useAddNewFieldMutation();

  const formik = useFormik({
    initialValues: {
      fieldName: "",
      fieldType: "dropdown",
      dataSource: dataSources?.length ? dataSources[0].id : "",
      options: dataSources?.length ? dataSources[0].options : [],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // const isChanged = !arrayEquals(
      //   values.options,
      //   dataSources?.data?.find((item) => item.id === values.datasource)
      //     ?.options
      // );

      // if (isChanged) {
      //   const data = {
      //     options: values?.options,
      //     id: values?.datasource,
      //   };

      //   // editDataSourceMutation
      //   EditDataSourceMutation.mutate(data, {
      //     onSuccess: () => {
      //       // refresh data
      //       queryClient.invalidateQueries("datasource");
      //     },
      //     onError: (error) => {
      //       console.log(error);
      //     },
      //   });
      // }

      const data = {
        type: values.fieldType,
        name: values.fieldName,
        dataSourceId: values.dataSource,
        // options: values.options,
      };

      try {
        await AddNewField(data).unwrap();

        handleCloseCreateField();
      } catch (err) {
        console.error("Failed to save: ", err);
      }
    },
  });

  const handleOnChangeOptions = (e) => {
    formik.setFieldValue("dataSource", e.target.value);
    const options = dataSources?.find(
      (item) => `${item.id}` === e.target.value
    )?.options;

    formik.setFieldValue("options", options || []);
  };

  const handleCloseCreateField = () => {
    setCurrentTab(LIST_TAB);
  };

  console.log(formik.errors);

  return (
    <Pane>
      <CreateFieldHeadline closeCreateField={handleCloseCreateField} />

      <Pane overflow="auto" paddingX={15} paddingY={15}>
        <TextInputField
          width="100%"
          marginBottom={15}
          label="Field Name"
          value={formik.values.fieldName}
          onChange={formik.handleChange}
          name="fieldName"
          isInvalid={formik.errors?.fieldName ? true : false}
          required
          validationMessage={
            formik.errors?.fieldName && formik.errors?.fieldName
          }
        />

        {/* Field Type */}
        <SelectField
          value={formik.values.fieldType}
          onChange={formik.handleChange}
          name="fieldType"
          isInvalid={formik.errors?.fieldType ? true : false}
          required
          label="Field Type"
          validationMessage={
            formik.errors?.fieldType && formik.errors?.fieldType
          }
        >
          <option value="dropdown">Dropdown</option>
          <option value="radio">Radio Button</option>
        </SelectField>

        {/* Data Source */}
        <SelectField
          label="Data Source"
          name="dataSource"
          value={formik.values.dataSource}
          onChange={handleOnChangeOptions}
          isInvalid={formik.errors?.dataSource ? true : false}
          validationMessage={
            formik.errors?.dataSource && formik.errors?.dataSource
          }
        >
          {dataSources?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </SelectField>

        {/* DropDown Options */}
        <DropDownOptions
          options={formik.values.options}
          setFieldValue={formik.setFieldValue}
        />
        {formik.errors.options && (
          <Pane color="red" paddingX={10} paddingY={10}>
            {formik.errors.options.length < 0 && "options are required"}
          </Pane>
        )}
        <Pane display="flex" justifyContent="space-between" paddingY={15}>
          <Button onClick={handleCloseCreateField}>Cancel</Button>
          <Button onClick={formik.handleSubmit} isLoading={isAdding}>
            Add Field
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default FieldTab;
