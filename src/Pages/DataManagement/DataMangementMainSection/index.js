import { useDataSourceContext } from "../../../Utils/Context/DataSourceContext.js";
import { LIST_TAB } from "../../../Utils/constants.js";
import { Pane, Heading, ListIcon } from "evergreen-ui";

// components
import ListItemsTab from "./ListItemsTab";
import ListFieldsTab from "./ListFieldsTab";

const MainSectionHeadLine = () => {
  return (
    <Pane display="flex" gap={2} alignItems="center" marginBottom={2}>
      <ListIcon />
      <Heading>Data Management</Heading>
    </Pane>
  );
};

const DataMangementMainSection = () => {
  const dataSourceContext = useDataSourceContext();
  const { currentTab } = dataSourceContext;

  return (
    <Pane paddingX={1} paddingY={1} width="100%" height="100%">
      <MainSectionHeadLine />
      {currentTab === LIST_TAB ? <ListItemsTab /> : <ListFieldsTab />}
    </Pane>
  );
};

export default DataMangementMainSection;
