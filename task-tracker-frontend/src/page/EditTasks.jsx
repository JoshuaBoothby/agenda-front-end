import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditFormTasks } from "../component/EditFormTasks";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "/tasks";

export const EditTasks = () => {
  const [task, setTask] = useState(null);
  const { task_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      const url = `${baseUrl}/employees`; // or /tasks
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(data.message || "Unauthorized or invalid response");
      }
      const foundTask = data.find(
        (emp) => emp.employee_id === parseInt(task_id)
      );
      if (foundTask) {
        setTask(foundTask);
      } else {
        navigate("/");
      }
    };
    fetchTask();
  }, [task_id, navigate]);

  const handleClose = () => navigate("/");

  if (!task) return <div>Loading...</div>;
  return <EditFormTasks task={task} onClose={handleClose} />;
};
