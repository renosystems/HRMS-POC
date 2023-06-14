import { useParams, useNavigate } from "react-router-dom";
import DepartmentForm from "../../UI-Components/DepartmentForm";
import {
  useGetDepartment,
  usePatchDepartment,
  useDeleteDepartment,
} from "../../Services/departments.service";

function SingleDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFetching, data } = useGetDepartment(id);
  const mutation = usePatchDepartment(id);
  const deleteMutation = useDeleteDepartment(id, () =>
    navigate("/departments")
  );

  return (
    <div>
      Department
      {isFetching ? (
        "...loading"
      ) : (
        <div>
          <DepartmentForm
            values={{ name: data?.data?.name }}
            action={(newValues) => mutation.mutate(newValues)}
            submitText="Update"
          />
          <button onClick={() => deleteMutation.mutate()}>delete</button>
        </div>
      )}
    </div>
  );
}

export default SingleDepartment;
