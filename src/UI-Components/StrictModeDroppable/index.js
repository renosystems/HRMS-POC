import { Pane } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <Pane
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...props.sx}
          backgroundColor={snapshot.isDraggingOver && "#b0bec5"}
          marginX={15}
          marginY={15}
          paddingX={15}
          paddingY={15}
          display="flex"
          minHeight="100px"
        >
          {children}
          {provided.placeholder}
        </Pane>
      )}
    </Droppable>
  );
};

export default StrictModeDroppable;
