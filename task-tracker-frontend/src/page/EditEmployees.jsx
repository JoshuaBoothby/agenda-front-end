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
        const url = `${baseUrl}${endPoint}/${employee_id}`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          throw new Error("Failed to load employee");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        navigate("/");
      }
    };

    fetchEmployee();
  }, [employee_id, navigate]);

  const handleClose = () => {
    navigate("/employees");
  };

  if (!employee) {
    return <div className="container mt-4">Loading...</div>;
  }

  return <EditFormEmployees employee={employee} onClose={handleClose} />;
};
