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
      const url = `${baseUrl}${endPoint}/${task_id}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTask(data);
      } else {
        alert("Failed to load task.");
        navigate("/tasks");
      }
    };
    fetchTask();
  }, [task_id, navigate]);

  const handleClose = () => navigate("/tasks");

  if (!task) return <div>Loading...</div>;
  return <EditFormTasks task={task} onClose={handleClose} />;
};
