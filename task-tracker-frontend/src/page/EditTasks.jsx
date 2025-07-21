import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditFormTasks } from "../component/EditFormTasks";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "tasks";

export const EditTasks = () => {
  const [task, setTask] = useState(null);
  const { task_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const url = `${baseUrl}${endPoint}`;
      const response = await fetch(url);
      const data = await response.json();
      const foundTask = data.find((t) => t.task_id === parseInt(task_id));
      if (foundTask) setTask(foundTask);
      else navigate("/");
    };
    fetchTask();
  }, [task_id, navigate]);

  const handleClose = () => navigate("/");

  if (!task) return <div>Loading...</div>;
  return <EditFormTasks task={task} onClose={handleClose} />;
};
