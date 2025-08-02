import React, { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "/tasks";

export const FormTasks = () => {
  const [newTask, setNewTask] = useState({
    description: "",
    status: "",
    employee_id: "",
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = baseUrl + endPoint;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setNewTask({ description: "", status: "", employee_id: "" });
    window.location.reload();
  };

  return (
    <>
      <h1>Add Task</h1>
      <main className="container mb-4">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              name="description"
              value={newTask.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <input
              name="status"
              value={newTask.status}
              onChange={handleChange}
              placeholder="Status"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              name="employee_id"
              value={newTask.employee_id}
              onChange={handleChange}
              placeholder="Employee ID"
              type="number"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </form>
      </main>
    </>
  );
};
