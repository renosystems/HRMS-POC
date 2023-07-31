/**
 * utitly DnD functions
 * function used to change item order in a list
 * @param {*} list the list to be reordered
 * @param {*} startIndex the start index of the item to be moved
 * @param {*} endIndex the end index of the item to be moved
 * @returns
 */
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * utitly DnD functions
 * Function used to move item from list to another list
 * @param {*} source the source list
 * @param {*} destination the destination list
 * @param {*} droppableSource the droppable item that is being moved
 * @param {*} droppableDestination the destination droppable item the out item will be moved to
 * @returns
 */
export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  return {
    source: sourceClone,
    destination: destClone,
  };
};

/**
 * utitly DnD functions
 * Function used to move item from list to another list with replacement
 * @param {*} source the source list
 * @param {*} destination the destination list
 * @param {*} droppableSource the droppable item that is being moved
 * @param {*} droppableDestination the destination droppable item the out item will be moved to
 * @returns
 */
export const moveWithReplacement = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const destIdxToBeRemoved =
    droppableDestination.index === destClone.length
      ? droppableDestination.index - 1
      : droppableDestination.index;

  let destItemToBeMoved = destClone[destIdxToBeRemoved];

  // replace the item in the source list with the item in the destination list
  const [removed] = sourceClone.splice(
    droppableSource.index,
    1,
    destItemToBeMoved
  );

  // replace the item in the destenation list with the item in the source list
  destClone.splice(destIdxToBeRemoved, 1, removed);

  return {
    source: sourceClone,
    destination: destClone,
  };
};
