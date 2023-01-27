import * as React from "react";

export type RoleContextType = {
  role: string;
  setRole?: React.Dispatch<React.SetStateAction<string>>;
};

export const RoleContext = React.createContext<RoleContextType | null>(null);
