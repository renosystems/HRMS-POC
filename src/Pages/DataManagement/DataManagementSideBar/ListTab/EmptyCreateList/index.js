import { Pane, Heading, Paragraph, Button } from "evergreen-ui";

const EmptyCreateList = ({ openCreateList }) => {
  return (
    <Pane
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingX={10}
    >
      {/* <FormatListBulletedIcon sx={{ fontSize: "50px" }} /> */}
      <Heading>Create Your First List</Heading>
      <Paragraph textAlign="center">
        You can upload your lists whether they're list of departments,
        companies, sites or locations
      </Paragraph>
      <Button onClick={openCreateList}>Create List</Button>
      <Button>Upload List</Button>
    </Pane>
  );
};

export default EmptyCreateList;
