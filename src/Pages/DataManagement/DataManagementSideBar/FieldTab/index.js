import { Pane, ArrowLeftIcon, Button, Paragraph } from "evergreen-ui";
import { useDataSourceContext } from "../../../../Utils/Context/DataSourceContext";
import { LIST_TAB } from "../../../../Utils/constants";
// const DropDownOptions = ({ getValues, setValue, register }) => {
//   return (
//     <>
//       {/* Dropdown select */}
//       {getValues("options").map((item, index) => (
//         <ListItem key={index}>
//           <TextField
//             {...register(`options.${index}`, {
//               required: true,
//             })}
//             label={`Option ${index + 1}`}
//             variant="outlined"
//             size="small"
//             fullWidth
//             InputProps={{
//               endAdornment: (
//                 <IconButton
//                   color="error"
//                   onClick={() =>
//                     setValue(
//                       "options",
//                       getValues("options").filter((_, i) => i !== index),
//                       {
//                         shouldValidate: true,
//                         shouldDirty: true,
//                       }
//                     )
//                   }
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </ListItem>
//       ))}
//       <ListItem>
//         <ListItemButton
//           sx={{ display: "flex", alignItems: "center", gap: 2 }}
//           onClick={() => {
//             console.log("add new option");
//             setValue("options", [...getValues("options"), ""], {
//               shouldValidate: true,
//               shouldDirty: true,
//             });
//           }}
//         >
//           <AddCircleIcon color="success" />
//           <ListItemText primary="Add new Option" />
//         </ListItemButton>
//       </ListItem>
//     </>
//   );
// };

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
  const dataSourceContext = useDataSourceContext();

  const handleCloseCreateField = () => {
    dataSourceContext.setCurrentTab(LIST_TAB);
  };
  return (
    <Pane>
      <CreateFieldHeadline closeCreateField={handleCloseCreateField} />
    </Pane>
  );
};

export default FieldTab;
