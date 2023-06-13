import { useNavigate } from "react-router-dom";
import { useGetDepartments } from "../../Services/departments.service";
import DepartmentCard from "./DepartmentCard/DepartmentCard";

function Departments() {
  const { isFetching, data } = useGetDepartments();
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
      {isFetching
        ? "loading..."
        : data.data.map((dep) => (
            <DepartmentCard
              key={dep._id}
              depName={dep.name}
              depId={dep._id}
              handleOpenDepartment={handleOpenDepartment}
            />
          ))}
    </div>
  );
}

export default Departments;
