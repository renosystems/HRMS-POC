function DepartmentCard({ depName, depId, handleOpenDepartment }) {
  return (
    <div>
      <div
        style={{
          height: "200px",
          width: "200px",
          background: "yellow",
          margin: "50px",
        }}
      >
        {depName}
        <br />
        <button onClick={() => handleOpenDepartment(depId)}>open</button>
      </div>
    </div>
  );
}

export default DepartmentCard;
