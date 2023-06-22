import { useParams, useNavigate } from "react-router-dom";
import DepartmentForm from "../../UI-Components/DepartmentForm";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../Utils/RTK/slices/api.slice";

function SingleDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, isSuccess } = useGetDepartmentQuery(id);
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: isDeleting }] =
    useDeleteDepartmentMutation();

  return (
    <div>
      Department
      {isFetching ? (
        "...loading"
      ) : isSuccess ? (
        <div>
          <DepartmentForm
            values={{ name: data?.data?.name }}
            action={(newValues) =>
              updateDepartment({ id: id, data: newValues }).unwrap()
            }
            submitText="Update"
            isLoading={isLoading}
          />
          <button
            disabled={isDeleting}
            onClick={async () => {
              await deleteDepartment(id).unwrap();
              navigate("/departments");
            }}
          >
            delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default SingleDepartment;
