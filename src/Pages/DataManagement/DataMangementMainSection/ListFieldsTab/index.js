import { useState } from "react";
import {
  useDeleteFieldMutation,
  useGetFieldsQuery,
} from "../../../../Utils/RTK/slices/fieldsApi.slice.js";
import {
  Pane,
  Checkbox,
  Spinner,
  TextInput,
  Paragraph,
  MoreIcon,
  TrashIcon,
  Menu,
  EditIcon,
  Popover,
  Position,
} from "evergreen-ui";

const ItemCard = ({ item }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [deleteField, { isLoading: isDeleting }] = useDeleteFieldMutation();

  const onEditField = (e) => {
    if (!e.target.value) return setIsEdit(false);

    if (e.key === "Enter") {
      // handleEditField(colId, item?.id, {
      // 	name: e.target.value,
      // });
      setIsEdit(false);
    }
  };

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
        <Popover
          position={Position.BOTTOM_RIGHT}
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon={EditIcon}>Edit Field</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group>
                {isDeleting ? (
                  <Spinner />
                ) : (
                  <Menu.Item
                    icon={TrashIcon}
                    intent="danger"
                    onClick={() => deleteField(item.id).unwrap()}
                  >
                    Delete Field
                  </Menu.Item>
                )}
              </Menu.Group>
            </Menu>
          }
        >
          <MoreIcon marginRight={16} cursor="pointer"></MoreIcon>
        </Popover>
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
