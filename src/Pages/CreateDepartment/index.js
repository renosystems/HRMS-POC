import { useNavigate } from "react-router-dom";
import DepartmentForm from "../../UI-Components/DepartmentForm";
import { usePostDepartment } from "../../Services/departments.service";

function CreateDepartment() {
  const mutation = usePostDepartment(() => navigate("/departments"));
  const navigate = useNavigate();

  return (
    <div>
      <DepartmentForm
        values={{ name: "" }}
        action={(newValues) => mutation.mutate(newValues)}
        submitText="Save"
      />
    </div>
  );
}

export default CreateDepartment;
