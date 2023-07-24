import { useState } from "react";
import { Pane } from "evergreen-ui";

import CreateList from "./CreateList";
import EmptyCreateList from "./EmptyCreateList";

const ListTab = () => {
  const [isCreateList, setIsCreateList] = useState(false);

  const openCreateList = () => {
    setIsCreateList(true);
  };

  const closeCreateList = () => {
    setIsCreateList(false);
  };

  return (
    <Pane width="100%" height="100%">
      {isCreateList ? (
        <CreateList closeCreateList={closeCreateList} />
      ) : (
        <EmptyCreateList openCreateList={openCreateList} />
      )}
    </Pane>
  );
};

export default ListTab;
