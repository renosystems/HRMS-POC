import { Pane, Paragraph, EditIcon, Heading, Spinner } from "evergreen-ui";
import { useDataSourceContext } from "../../../../Utils/Context/DataSourceContext.js";
import { useGetDatasourcesQuery } from "../../../../Utils/RTK/slices/datasourceApiSlice.slice.js";
const ItemRow = ({ item }) => {
  const dataSourceContext = useDataSourceContext();
  const { setListToEdit } = dataSourceContext;

  const handleEdit = () => {
    setListToEdit(item);
  };

  return (
    <Pane
      onClick={handleEdit}
      display="flex"
      justifyContent="space-between"
      cursor="pointer"
      paddningX={10}
      paddningY={10}
      marginTop={10}
      border="1px solid grey"
      borderLeft="5px solid grey"
      borderRadius="5px"
      width="100%"
    >
      <Paragraph>{item?.name}</Paragraph>
      <Paragraph onClick={handleEdit}>
        <EditIcon color="grey" cursor="pointer" />
      </Paragraph>
    </Pane>
  );
};

const EmptyList = () => {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Heading>No Lists Found</Heading>
      <Paragraph>
        Create your first list to use it in fields like drop down lists
      </Paragraph>
    </Pane>
  );
};

const ListItems = ({ data }) => {
  if (!data || data?.length === 0) {
    return <EmptyList />;
  }

  return (
    <Pane paddingX={20}>
      {data?.map((item) => (
        <ItemRow item={item} key={item.id} />
      ))}
    </Pane>
  );
};

const ListItemsTab = () => {
  const {
    data: dataSources,
    isLoading,
    isError,
    error,
  } = useGetDatasourcesQuery();
  return (
    <Pane>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Paragraph>{error}.</Paragraph>
      ) : (
        <ListItems data={dataSources} />
      )}
    </Pane>
  );
};

export default ListItemsTab;
