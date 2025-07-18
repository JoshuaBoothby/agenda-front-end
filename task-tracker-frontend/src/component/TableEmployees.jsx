import React, { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://44.211.219.4:3000/";
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
