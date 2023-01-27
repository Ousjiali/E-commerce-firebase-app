import * as React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export const EmployeeLayout = (props: Props) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
