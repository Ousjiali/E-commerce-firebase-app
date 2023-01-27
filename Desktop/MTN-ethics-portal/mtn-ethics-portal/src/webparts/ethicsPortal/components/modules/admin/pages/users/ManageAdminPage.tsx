import * as React from "react";
import { AdminListTable } from "./components/AdminListTable";
import { StaffData } from "./components/PeoplePicker";

export interface Data {
  adminId: string;
  data: StaffData;
}

type Props = {
  users: StaffData[];
  isLoading: boolean;
};

export const ManageAdminPage: React.FC<Props> = ({ users, isLoading }) => {
  return <AdminListTable users={users} loading={isLoading} />;
};
