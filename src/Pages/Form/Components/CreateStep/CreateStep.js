import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Pane, Button, TextInputField, Heading, TrashIcon } from "evergreen-ui";
import StrictModeDraggable from "../../../../UI-Components/StrictModeDraggable";
import StrictModeDroppable from "../../../../UI-Components/StrictModeDroppable";

import {
  reorder,
  move,
  moveWithReplacement,
} from "../../../../Utils/draganddrop";

const DraggableCard = ({ draggableId, index, handleDelete, ...props }) => {
  return (
    <StrictModeDraggable
      draggableId={draggableId}
      index={index}
      {...props}
      sx={{
        mx: 1,
      }}
    >
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="1px solid grey"
        minWidth={200}
        backgroundColor="white"
      >
        <Pane>
          <Heading color="grey">Card {draggableId}</Heading>
        </Pane>
        <TrashIcon color="danger" onClick={handleDelete} cursor="pointer" />
      </Pane>
    </StrictModeDraggable>
  );
};

let tempId = 0;

const CreateStep = () => {
  const [maxItemsPerRow, setMaxItemsPerRow] = useState(3);
  const [maxNumArr, setMaxNumArr] = useState([3, 3]);
  const [rows, setRows] = useState([
    [], // row 1
    [], // row 2
  ]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // reordering within the same row list
    if (source.droppableId === destination.droppableId) {
      // check if same element
      if (source.index === destination.index) {
        return;
      }

      const rowIndex = Number(source.droppableId);
      const sourceList = rows[rowIndex];
      const reorderedRow = reorder(sourceList, source.index, destination.index);

      setRows((prev) => {
        return prev.map((row, index) => {
          if (index === rowIndex) {
            return reorderedRow;
          }

          return row;
        });
      });
      return;
    }

    // different row list
    const sourceRowIndex = Number(source.droppableId);
    const sourceList = rows[sourceRowIndex];

    const destinationRowIndex = Number(destination.droppableId);
    const destinationList = rows[destinationRowIndex];

    // check it has less than 3 items
    let newSource, newDestination;
    // if (destinationList.length >= maxItemsPerRow) {
    if (destinationList.length >= maxNumArr[destinationRowIndex]) {
      const { source: tempSource, destination: tempDest } = moveWithReplacement(
        sourceList,
        destinationList,
        source,
        destination
      );

      newSource = tempSource;
      newDestination = tempDest;
    } else {
      const { source: tempSource, destination: tempDest } = move(
        sourceList,
        destinationList,
        source,
        destination
      );
      newSource = tempSource;
      newDestination = tempDest;
    }

    setRows((prev) => {
      let tempArr = prev.map((row, index) => {
        if (index === sourceRowIndex) {
          return newSource;
        }

        if (index === destinationRowIndex) {
          return newDestination;
        }

        return row;
      });
      // .filter((row, index) => row.length > 0 || index === prev.length - 1);

      // check if there's empty row in between
      let elementToRemoveIndex = -1;
      elementToRemoveIndex = tempArr.findIndex(
        (row) => row.length === 0 && row !== tempArr[tempArr.length - 1]
      );

      if (elementToRemoveIndex !== -1) {
        tempArr.splice(elementToRemoveIndex, 1);
        setMaxNumArr((prev2) => {
          let tempArr2 = [...prev2];
          tempArr2.splice(elementToRemoveIndex, 1);
          return tempArr2;
        });
      }

      if (tempArr && tempArr?.[tempArr.length - 1]?.length !== 0) {
        tempArr.push([]);
        setMaxNumArr((prev) => [...prev, 3]);
      }

      return tempArr;
    });
  };

  const handleAddNewItem = () => {
    const currId = tempId++;

    setRows((prev) => {
      const firstRow = prev[0];
      // if (firstRow.length < maxItemsPerRow) {
      if (firstRow.length < maxNumArr[0]) {
        return [
          [
            ...firstRow, //  first row with new item
            {
              id: currId + 1,
            },
          ],
          ...prev.slice(1), // all rows except first row
        ];
      }

      let lastRowIndex = prev.length - 1;
      let lastRow = prev[lastRowIndex];
      const lastRowLength = lastRow.length;
      let tempArr;

      // if (prev?.[prev.length - 2]?.length < maxItemsPerRow) {
      if (prev?.[prev.length - 2]?.length < maxNumArr?.[prev.length - 2]) {
        console.log("length - 2", prev[prev.length - 2]);
        tempArr = prev.map((row, index) => {
          if (index === prev.length - 2) {
            return [...row, { id: currId + 1 }];
          }

          return row;
        });
        // } else if (lastRowLength < maxItemsPerRow) {
      } else if (lastRowLength < maxNumArr[lastRowIndex]) {
        tempArr = prev.map((row, index) => {
          if (index === lastRowIndex) {
            return [...row, { id: currId + 1 }];
          }

          return row;
        });
      } else {
        tempArr = [...prev, [{ id: currId + 1 }]];
      }

      if (tempArr && tempArr?.[tempArr.length - 1]?.length !== 0) {
        console.log("tempArr", tempArr);
        tempArr.push([]);
        setMaxNumArr((prev) => [...prev, 3]);
      }

      return tempArr;
    });
  };

  const handleDelete = (draggableId) => {
    setRows((prev) => {
      let tempArr = prev.map((row) => {
        return row.filter((item) => item.id !== draggableId);
      });

      tempArr = tempArr.filter(
        (row, index) => row.length > 0 || index === tempArr.length - 1
      );

      return tempArr;
    });
  };

  return (
    <Pane marginY={20} marginX={10} width="100%">
      <Pane marginY={20}>
        <Button onClick={handleAddNewItem}>Add New Field</Button>
        <Button
          onClick={() => {
            setRows([[], []]);
            tempId = 0;
          }}
          marginY={15}
        >
          Clear All
        </Button>
      </Pane>
      <DragDropContext onDragEnd={handleDragEnd}>
        {rows.map((row, rowIndex) => (
          <Pane display="flex" alignItems="center" key={rowIndex}>
            <StrictModeDroppable
              droppableId={`${rowIndex}`}
              index={rowIndex}
              sx={{
                flexDirection: "row",
                gap: 0,
                minWidth: "300px",
                background: "grey",
              }}
              direction="horizontal"
            >
              {row.map((item, index) => (
                <DraggableCard
                  key={item?.id}
                  draggableId={`${item?.id}`}
                  index={index}
                  handleDelete={() => handleDelete(item?.id)}
                />
              ))}
            </StrictModeDroppable>
            <TextInputField
              value={maxNumArr[rowIndex]}
              onChange={(e) => {
                let num = Number(e.target.value);
                num = num < 1 ? 1 : num > 5 ? 5 : num;
                setMaxNumArr((prev) => {
                  let tempArr = [...prev];
                  tempArr[rowIndex] = num;
                  return tempArr;
                });
              }}
              label={`Max Per Row ${rowIndex + 1}`}
              type="number"
              marginX={20}
            />
          </Pane>
        ))}
      </DragDropContext>
    </Pane>
  );
};

export default CreateStep;
