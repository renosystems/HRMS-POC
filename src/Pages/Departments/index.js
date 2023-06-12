import { useGetDepartments } from "../../Services/departments.service";
function Departments() {
  const { isFetching, data } = useGetDepartments();

  console.log(data);
  return <div>Departments</div>;
}

export default Departments;
