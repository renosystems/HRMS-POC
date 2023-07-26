import { Pane, Tab, Tablist } from "evergreen-ui";
import { useDataSourceContext } from "../../../Utils/Context/DataSourceContext";
import { LIST_TAB, FIELD_TAB } from "../../../Utils/constants";
import FieldTab from "./FieldTab";
import ListTab from "./ListTab";
import EditList from "./ListTab/EditList";

const DataManagementSidebar = () => {
  const { listToEdit, currentTab, setCurrentTab, setListToEdit } =
    useDataSourceContext();

  const handleChange = (newValue) => {
    setListToEdit(null);
    setCurrentTab(newValue);
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      minHeight="80vh"
      width={400}
      borderRight="1px solid grey"
    >
      <Tablist display="flex" marginBottom={16} marginRight={24}>
        <Tab
          direction="vertical"
          isSelected={currentTab === LIST_TAB}
          key={LIST_TAB}
          onSelect={() => handleChange(LIST_TAB)}
        >
          Creating A List
        </Tab>
        <Tab
          direction="vertical"
          isSelected={currentTab === FIELD_TAB}
          key={FIELD_TAB}
          onSelect={() => handleChange(FIELD_TAB)}
        >
          Creating A Field
        </Tab>
      </Tablist>
      {listToEdit ? (
        <EditList />
      ) : currentTab === LIST_TAB ? (
        <ListTab />
      ) : (
        <FieldTab />
      )}
    </Pane>
  );
};

export default DataManagementSidebar;
