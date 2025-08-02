import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "/employees";

export const TableEmployees = () => {
  const navigate = useNavigate();
  const [dataEmployees, setDataEmployees] = useState([]);

  const getEmployees = async () => {
    const token = localStorage.getItem("token");
    const url = `${baseUrl}${endPoint}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(data.message || "Unauthorized or invalid response");
    }
    setDataEmployees(data);
  };

  const handleEdit = (id) => {
    navigate(`/editEmployees/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const url = `${baseUrl}/employees/${id}`; // or /tasks/${id}
        await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        getEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <h1>Employee Data Base</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataEmployees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(employee.employee_id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(employee.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
