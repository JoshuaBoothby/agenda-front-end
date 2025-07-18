import React from "react";
import { TableEmployees } from "../component/TableEmployees";
import { FormEmployees } from "../component/FormEmployees";

export const Employee = () => {
  return (
    <>
      <FormEmployees />
      <TableEmployees />
    </>
  );
};
