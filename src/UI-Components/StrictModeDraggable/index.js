import { Pane, DragHandleVerticalIcon } from "evergreen-ui";
import { Draggable } from "react-beautiful-dnd";

const StrictModeDraggable = ({
  item,
  draggableId,
  index,
  colId,
  children,
  ...props
}) => {
  return (
    <Draggable draggableId={draggableId} index={index} {...props}>
      {(provided) => (
        <Pane
          ref={provided.innerRef}
          {...props.sx}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          display="flex"
          marginX={20}
        >
          <DragHandleVerticalIcon color="grey" />
          {children}
        </Pane>
      )}
    </Draggable>
  );
};

export default StrictModeDraggable;
