import {
  useGetDepartment,
  usePatchDepartment,
} from "../../Services/departments.service";
import { useParams } from "react-router-dom";

function SingleDepartment() {
  const { id } = useParams();

  const { isFetching, data } = useGetDepartment(id);
  const mutation = usePatchDepartment(id);

  return (
    <div>
      Department
      {isFetching ? (
        "...loading"
      ) : (
        <div>
          name: {data?.data?.name}
          <br />
          <button onClick={() => mutation.mutate({ name: "new dep3" })}>
            update
          </button>
        </div>
      )}
    </div>
  );
}

export default SingleDepartment;
