import { useNavigate } from "react-router-dom";
import { useGetDepartmentsQuery } from "../../Utils/RTK/slices/api.slice";
import DepartmentCard from "./DepartmentCard/DepartmentCard";

function Departments() {
  const { data, isLoading, isSuccess, isError, error } =
    useGetDepartmentsQuery();

  const navigate = useNavigate();

  const handleOpenDepartment = (id) => {
    navigate(`/departments/${id}`);
  };

  return (
    <div>
      Departments
      <br />
      <button onClick={() => navigate("/departments/create")}>
        Add new Department
      </button>
      <br />
      {isLoading ? (
        "loading..."
      ) : isSuccess ? (
        data.data.map((dep) => (
          <DepartmentCard
            key={dep._id}
            depName={dep.name}
            depId={dep._id}
            handleOpenDepartment={handleOpenDepartment}
          />
        ))
      ) : isError ? (
        <div>{error.toString()}</div>
      ) : null}
    </div>
  );
}

export default Departments;
