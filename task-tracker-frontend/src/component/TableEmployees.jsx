import React, { use } from "react";
import { useEffect, useState } from "react";

const baseUrl = "http://44.211.219.4:3000/";
const endPoint = "employees";

export const TableEmployees = () => {
  const [dataEmployees, setDataEmployees] = useState([]);

  const getEmployees = async () => {
    const url = `${baseUrl}${endPoint}`;
    const response = await fetch(url);
    const data = await response.json();
    setDataEmployees(data);
    console.log(response);
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
          </tr>
        </thead>
        <tbody>
          {dataEmployees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
