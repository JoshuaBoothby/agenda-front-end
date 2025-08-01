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
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employee />} />
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
