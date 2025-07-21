import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Employee } from "./page/Employee";
import { Home } from "./page/Home";
import { EditEmployees } from "./page/EditEmployees";
import { TableTasks } from "./component/TableTasks";
import { FormTasks } from "./component/FormTasks";
import { EditTasks } from "./page/EditTasks";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editEmployees/:employee_id" element={<EditEmployees />} />
        <Route
          path="/tasks"
          element={
            <>
              <FormTasks />
              <TableTasks />
            </>
          }
        />
        <Route path="/editTasks/:task_id" element={<EditTasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
