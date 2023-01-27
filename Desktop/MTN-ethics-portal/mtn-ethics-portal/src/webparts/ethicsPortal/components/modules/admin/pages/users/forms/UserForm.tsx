import { Box } from "@material-ui/core";
import * as React from "react";
import { PeoplePicker, StaffData } from "../components/PeoplePicker";

type Props = {
  user: StaffData;
  onUpdate: React.Dispatch<StaffData>;
};

export const UserForm: React.FC<Props> = ({ user, onUpdate }) => {
  return (
    <Box
      component="form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <Box my={2} width="100%">
        <PeoplePicker
          label="Admin Name"
          staff={user}
          onUpdate={(staff) => onUpdate(staff)}
        />
      </Box>
    </Box>
  );
};

export interface User {
  StaffName: string;
  StaffEmail: string;
}
