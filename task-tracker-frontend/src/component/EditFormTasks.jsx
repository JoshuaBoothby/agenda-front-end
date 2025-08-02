import React, { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "/tasks";

export const EditFormTasks = ({ task, onClose }) => {
  const [editTask, setEditTask] = useState({
    description: task?.description || "",
    status: task?.status || "",
    employee_id: task?.employee_id || "",
  });

  const handleChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = `${baseUrl}${endPoint}/${task.task_id}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(editTask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (onClose) onClose();
  };

  return (
    <main className="container mb-4">
      <h1>Edit Task</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            name="description"
            value={editTask.description}
            onChange={handleChange}
            placeholder="Description"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            name="status"
            value={editTask.status}
            onChange={handleChange}
            placeholder="Status"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input
            name="employee_id"
            value={editTask.employee_id}
            onChange={handleChange}
            placeholder="Employee ID"
            type="number"
            className="form-control"
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary flex-grow-1">
            Update Task
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};
