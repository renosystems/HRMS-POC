import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostDepartment } from "../../Services/departments.service";

function CreateDepartment() {
  const [name, setName] = useState("");
  const mutation = usePostDepartment(() => navigate("/departments"));
  const navigate = useNavigate();

  return (
    <div>
      <input
        name="name"
        id="depName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => mutation.mutate({ name: name })}>Save</button>
    </div>
  );
}

export default CreateDepartment;
