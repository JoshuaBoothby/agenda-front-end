import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "tasks";

export const TableTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const getTasks = async () => {
    const url = `${baseUrl}${endPoint}`;
    const response = await fetch(url);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleEdit = (id) => navigate(`/editTasks/${id}`);
  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await fetch(`${baseUrl}${endPoint}/${id}`, { method: "DELETE" });
      getTasks();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-secondary w-100"
          style={{ maxWidth: "400px" }}
          onClick={() => navigate("/")}
        >
          Back to Employees
        </button>
      </div>
      <h1>Task Data Base</h1>
      <main className="container mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>Employee ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.task_id}>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.employee_id}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(task.task_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(task.task_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};
