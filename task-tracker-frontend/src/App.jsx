import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Employee } from "./page/Employee";
import { Home } from "./page/Home";
import { EditEmployees } from "./page/EditEmployees";
import { TableTasks } from "./component/TableTasks";
import { FormTasks } from "./component/FormTasks";
import { EditTasks } from "./page/EditTasks";
import { PrivateRoute } from "./component/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/editEmployees/:employee_id"
          element={
            <PrivateRoute>
              <EditEmployees />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <>
                <FormTasks />
                <TableTasks />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/editTasks/:task_id"
          element={
            <PrivateRoute>
              <EditTasks />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
