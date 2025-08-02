import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditFormEmployees } from "../component/EditFormEmployees";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "/employees";

export const EditEmployees = () => {
  const [employee, setEmployee] = useState(null);
  const { employee_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${baseUrl}/employees`; // or /tasks
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(data.message || "Unauthorized or invalid response");
        }
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
