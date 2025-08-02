import React, { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "/employees";

export const EditFormEmployees = ({ employee, onClose }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: employee?.name || "",
    department: employee?.department || "",
    role: employee?.role || "",
  });

  const handlerName = (e) => {
    setNewEmployee({ ...newEmployee, name: e.target.value });
  };

  const handlerDepartment = (e) => {
    setNewEmployee({ ...newEmployee, department: e.target.value });
  };

  const handlerRole = (e) => {
    setNewEmployee({ ...newEmployee, role: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const url = `${baseUrl}/employees/${employee.employee_id}`;
      await fetch(url, {
        method: "PUT",
        body: JSON.stringify(newEmployee),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (onClose) {
        onClose(); // Close the edit form after successful update
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating employee");
    }
  };

  return (
    <>
      <h1>Edit Employee</h1>
      <main className="container ml-2 mr-2 mb-4">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              onChange={handlerName}
              value={newEmployee.name}
              type="text"
              className="form-control"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              onChange={handlerDepartment}
              value={newEmployee.department}
              type="text"
              className="form-control"
              placeholder="Enter department"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              onChange={handlerRole}
              value={newEmployee.role}
              type="text"
              className="form-control"
              placeholder="Enter role"
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">
              Update Employee
            </button>
            {onClose && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </main>
    </>
  );
};
