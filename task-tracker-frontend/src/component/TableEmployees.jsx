import React, { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "employees";

export const TableEmployees = () => {
  const navigate = useNavigate();
  const [dataEmployees, setDataEmployees] = useState([]);

  const getEmployees = async () => {
    const url = `${baseUrl}${endPoint}`;
    const response = await fetch(url);
    const data = await response.json();
    setDataEmployees(data);
    console.log(response);
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
        const url = `${baseUrl}${endPoint}/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (response.ok) {
          getEmployees();
        } else {
          console.error("Error deleting employee:", response.statusText);
        }
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
                  className="btn btn-danger"
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
