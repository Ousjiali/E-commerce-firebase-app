import React from "react";
import AdminLink from "./AdminLink";

export const Navigator = ({ role, name }) => {
  return <AdminLink name={name} roles={role} />;
};
