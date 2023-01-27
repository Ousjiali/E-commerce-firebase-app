import React from "react";
import { AdminWrapper } from "./AdminWrapper";

type Props = {};

export const AdminLayout = ({ children }) => {
  return <AdminWrapper>{children}</AdminWrapper>;
};
