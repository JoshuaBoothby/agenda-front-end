import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "employees";

export const FormEmployees = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    role: "",
  });
  const navigate = useNavigate();

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
    const url = baseUrl + endPoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newEmployee),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setNewEmployee({
        name: "",
        department: "",
        role: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    window.location.reload();
  };
  return (
    <>
      <h1>Employee Form</h1>
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
          <button className="btn btn-primary w-100">Save Data</button>
        </form>
        <button
          className="btn btn-secondary w-100 mt-2"
          onClick={() => navigate("/tasks")}
        >
          Edit Tasks
        </button>
      </main>
    </>
  );
};
