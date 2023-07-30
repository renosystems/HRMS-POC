import { useState } from "react";
import { useGetFieldsQuery } from "../../../../Utils/RTK/slices/fieldsApi.slice.js";
import {
  Pane,
  Checkbox,
  Spinner,
  // Button,
  // Menu,
  // MenuItem,
  TextInput,
  Paragraph,
  // EditIcon,
  // DeleteIcon,
  // MenuIcon,
} from "evergreen-ui";

// const ActionsMenu = ({
//   anchorElActions,
//   handleCloseActionsMenu,
//   handleDeleteField,
// }) => {
//   const onEditField = (e) => {
//     console.log(e.target.value);
//   };

//   return (
//     <Menu
//       id="menu-appbar"
//       anchorEl={anchorElActions}
//       open={Boolean(anchorElActions)}
//       onClose={handleCloseActionsMenu}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "left",
//       }}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "center",
//       }}
//     >
//       <MenuItem
//         onClick={() => {
//           handleDeleteField();
//           handleCloseActionsMenu();
//         }}
//       >
//         <FlexBetweenBox>
//           <IconButton>
//             <DeleteIcon sx={{ color: "error.main" }} />
//           </IconButton>
//           <Typography variant="inherit">Delete</Typography>
//         </FlexBetweenBox>
//       </MenuItem>
//       <MenuItem onClick={onEditField}>
//         <FlexBetweenBox>
//           <IconButton>
//             <EditIcon sx={{ color: "grey.500" }} />
//           </IconButton>
//           <Typography variant="inherit">Edit</Typography>
//         </FlexBetweenBox>
//       </MenuItem>
//     </Menu>
//   );
// };

const ItemCard = ({ item }) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [anchorElActions, setAnchorElActions] = useState(null);

  const onEditField = (e) => {
    if (!e.target.value) return setIsEdit(false);

    if (e.key === "Enter") {
      // handleEditField(colId, item?.id, {
      // 	name: e.target.value,
      // });
      setIsEdit(false);
    }
  };

  // const handleOpenActionsMenu = (e) => {
  //   setAnchorElActions(e.currentTarget);
  // };

  // const handleCloseActionsMenu = () => {
  //   setAnchorElActions(null);
  // };

  return (
    <Pane
      gap={1}
      border="1px solid grey"
      paddingX={20}
      paddingTop={10}
      minWidth={400}
    >
      <Pane display="flex" justifyContent="space-between">
        <Pane display="flex" justifyContent="space-between">
          <Paragraph paddingX={10} backgroundColor="grey">
            {item?.id}
          </Paragraph>
          {isEdit ? (
            <TextInput
              defaultValue={item?.name}
              onKeyDown={onEditField}
              alignSelf="end"
            />
          ) : (
            <Paragraph>{item?.name}</Paragraph>
          )}
          {/* <IconButton onClick={() => setIsEdit((prev) => !prev)}>
						<EditIcon sx={{ color: 'grey.500' }} />
					</IconButton> */}
        </Pane>
        {/* <IconButton onClick={handleOpenActionsMenu}>
					<MoreHorizIcon sx={{ color: 'grey.500' }} />
				</IconButton> */}
        {/* <ActionsMenu
          anchorElActions={anchorElActions}
          handleCloseActionsMenu={handleCloseActionsMenu}
          handleDeleteField={() => handleDeleteField(colId, item?.id)}
        /> */}
      </Pane>
      <Pane
        display="flex"
        justifyContent="space-between"
        paddingX={10}
        paddingY={10}
        width="100%"
        border="1px solid grey"
      >
        <span>{item?.type}</span>
        {/* <ExpandMoreIcon
          sx={{
            color: "grey.500",
          }}
        /> */}
      </Pane>
      <Pane display="flex" justifyContent="flex-end" alignItems="center">
        <Checkbox
          size="small"
          // checked={item?.required}
        />
        <span>required</span>
      </Pane>
    </Pane>
  );
};

const ListFieldsTab = () => {
  const { data: fields, isLoading, isError } = useGetFieldsQuery();

  return (
    <Pane>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Paragraph color="red">Something went wrong</Paragraph>
      ) : (
        <Pane paddingY={20} paddingX={20}>
          <Pane display="flex" flexWrap="wrap" width="100%">
            {fields?.map((field) => (
              <Pane key={field.id} marginX={10} marginY={10}>
                <ItemCard key={field?.id} item={field} />
              </Pane>
            ))}
          </Pane>
        </Pane>
      )}
    </Pane>
  );
};

export default ListFieldsTab;
