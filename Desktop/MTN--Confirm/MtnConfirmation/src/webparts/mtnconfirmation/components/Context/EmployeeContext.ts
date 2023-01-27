import * as React from "react";

export type EmployeeContextType = {
  id: string;
  name?: string;
  employeeLevel: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  itemId: string;
  setEmployeeLevel: React.Dispatch<React.SetStateAction<string>>;
  setItemId: React.Dispatch<React.SetStateAction<string>>;
};
export const EmployeeContext = React.createContext<EmployeeContextType | null>(
  null
);
