import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { PeoplePicker } from "../../../Container/PeoplePicker";
import { AssignRoleApiRequest, Roles } from "../types/Configuration";

type Props = {
  staffData: AssignRoleApiRequest;
  onUpdate: React.Dispatch<AssignRoleApiRequest>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  label: string;
  onClose: () => void;
  isLoading: boolean;
};

export const RolesForm: React.FC<Props> = ({
  staffData,
  onUpdate,
  onSubmit,
  label,
  onClose,
  isLoading,
}) => {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      style={{
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Box>
        <PeoplePicker
          label="Choose Staff"
          staff={{
            Department: staffData?.Department,
            DisplayName: staffData?.StaffName,
            Email: staffData?.Email,
          }}
          onUpdate={(value) => {
            onUpdate({
              ...staffData,
              Department: value?.Department,
              Email: value?.Email,
              DisplayName: value?.DisplayName,
              StaffName: value?.DisplayName,
            });
          }}
        />
      </Box>
      <Box>
        <Autocomplete
          value={staffData?.role || ""}
          options={roles}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Role"
              fullWidth
              variant="outlined"
            />
          )}
          getOptionLabel={(option) => option}
          onChange={(e, newValue) => {
            onUpdate({
              ...staffData,
              role: newValue as Roles,
            });
          }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" style={{ gap: "2rem" }}>
        <Button
          onClick={() => onClose()}
          disabled={isLoading}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          endIcon={
            isLoading ? <CircularProgress size={20} color="secondary" /> : <></>
          }
          variant="contained"
          color="primary"
        >
          {label}
        </Button>
      </Box>
    </form>
  );
};

const roles = [Roles.Department_Manager, Roles.Hr, Roles.Trainer];
