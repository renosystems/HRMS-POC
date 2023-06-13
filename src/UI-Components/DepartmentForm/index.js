import { useState } from "react";

/**
 * @param {Object} values initial form values
 * @param {Object} action submit form action
 * @param {String} submitText submit btn text
 * @returns
 */
function DepartmentForm({ values, action, submitText }) {
  const [name, setName] = useState(values.name);

  return (
    <div>
      <input
        name="name"
        id="depName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => action({ ...values, name: name })}>
        {submitText}
      </button>
    </div>
  );
}

export default DepartmentForm;
