import { useNavigate } from "react-router-dom";
import DepartmentForm from "../../UI-Components/DepartmentForm";
import { useAddNewDepartmentMutation } from "../../Utils/RTK/slices/api.slice";

function CreateDepartment() {
  const [AddNewDepartment, { isLoading }] = useAddNewDepartmentMutation();
  const navigate = useNavigate();

  return (
    <div>
      <DepartmentForm
        values={{ name: "" }}
        action={async (newValues) => {
          await AddNewDepartment(newValues);
          navigate("/departments");
        }}
        submitText="Save"
        isLoading={isLoading}
      />
    </div>
  );
}

export default CreateDepartment;
