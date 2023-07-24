import { Pane } from "evergreen-ui";
import DataManagementSidebar from "./DataManagementSideBar";
import DataMangementMainSection from "./DataMangementMainSection";
import { DataSourceContextProvider } from "../../Utils/Context/DataSourceContext";

function DataManagement() {
  return (
    <DataSourceContextProvider>
      <Pane display="flex" flex={1}>
        <DataManagementSidebar />
        <DataMangementMainSection />
      </Pane>
    </DataSourceContextProvider>
  );
}

export default DataManagement;
