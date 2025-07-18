import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditFormEmployees } from "../component/EditFormEmployees";

const baseUrl = "http://44.211.219.4:3000/";
const endPoint = "employees";

export const EditEmployees = () => {
  const [employee, setEmployee] = useState(null);
  const { employee_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const url = `${baseUrl}${endPoint}`;
        const response = await fetch(url);
        const data = await response.json();
        const foundEmployee = data.find(
          (emp) => emp.employee_id === parseInt(employee_id)
        );

        if (foundEmployee) {
          setEmployee(foundEmployee);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        navigate("/");
      }
    };

    fetchEmployee();
  }, [employee_id, navigate]);

  const handleClose = () => {
    navigate("/");
  };

  if (!employee) {
    return <div className="container mt-4">Loading...</div>;
  }

  return <EditFormEmployees employee={employee} onClose={handleClose} />;
};
