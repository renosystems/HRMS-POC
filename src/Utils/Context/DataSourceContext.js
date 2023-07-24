import { useState, createContext, useContext } from "react";
import { LIST_TAB } from "../constants";

const DataSourceContext = createContext({
  listToEdit: null,
  currentTab: LIST_TAB,
  setCurrentTab: () => {},
  setListToEdit: () => {},
});

export const DataSourceContextProvider = ({ children }) => {
  const [listToEdit, setListToEdit] = useState(null);
  const [currentTab, setCurrentTab] = useState(LIST_TAB);

  return (
    <DataSourceContext.Provider
      value={{
        // curr tab state
        currentTab,
        setCurrentTab,

        // list to edit state
        listToEdit,
        setListToEdit,
      }}
    >
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSourceContext = () => {
  return useContext(DataSourceContext);
};
