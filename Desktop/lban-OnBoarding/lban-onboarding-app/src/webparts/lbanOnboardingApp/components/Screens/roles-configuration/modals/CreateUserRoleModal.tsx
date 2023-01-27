import {
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../utils/toast-messages";
import { RolesForm } from "../forms/RolesForm";
import {
  AssignRoleApiRequest,
  RolesConfiguartion,
} from "../types/Configuration";
import { FaTimesCircle } from "react-icons/fa";

type Props = {
  open: boolean;
  onClose: (status?: boolean) => void;
};

export const CreateUserRoleModal: React.FC<Props> = ({ onClose, open }) => {
  const [staff, setStaff] = React.useState<AssignRoleApiRequest>();
  const queryClient = useQueryClient();
  const data = new RolesConfiguartion();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    () => {
      return data.assignUserRole({
        Department: staff?.Department,
        Email: staff?.Email,
        StaffName: staff?.StaffName,
        role: staff?.role,
        DisplayName: staff?.DisplayName,
      });
    },

    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["userRoles"]);
        successAlert(toast, "User role added");
        onClose(true);
        return data?.data;
      },
      onError(error, variables, context) {
        errorAlert(toast);
      },
    }
  );
  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            color: colors.grey[500],
          }}
        >
          <FaTimesCircle />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RolesForm
          staffData={staff}
          onUpdate={(staff) => setStaff(staff)}
          label="Create"
          isLoading={mutation.isLoading}
          onClose={onClose}
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
