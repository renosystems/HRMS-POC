import { Pane, Heading, Badge } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

const FormCard = ({ form }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/forms/${form?.status}/${form?.id}`);
  };

  return (
    <Pane
      minWidth={275}
      alignSelf="stretch"
      cursor="pointer"
      onClick={handleNavigate}
      elevation={1}
      marginX={10}
      marginY={10}
      paddingX={15}
      paddingY={15}
    >
      <Pane>
        <Heading fontSize={14} color="grey">
          {"Form ID: " + form?.id}
        </Heading>
        <Heading>{form?.name}</Heading>
      </Pane>
      <Badge
        textTransform="capitalize"
        color={
          form?.status === "draft"
            ? "blue"
            : form?.status === "published"
            ? "green"
            : "red"
        }
      >
        {form?.status}
      </Badge>
    </Pane>
  );
};

export default FormCard;
